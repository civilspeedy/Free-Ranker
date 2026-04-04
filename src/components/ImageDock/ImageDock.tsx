import type { TargetedEvent } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './ImageDock.css';
import { AllImages, NextImgId } from '../../signals';
import type { Image } from '../../types';
import imageCompression from 'browser-image-compression';
import { signal } from '@preact/signals';
import ImageComponent from './Image';

const loading = signal<boolean>(false);

// make this a pop up window
// Next: image delete
export default function ImageDock(): JSX.Element {
    const [images, setImages] = useState<Image[]>([]);
    const [doCompress, setDoCompress] = useState(false);

    useEffect(() => {
        setImages(AllImages.value);
    }, [AllImages.value]);

    const toBase64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (e) => reject(e);
        });
    };

    const compress = async (file: File): Promise<File> => {
        loading.value = true;
        return await imageCompression(file, {
            maxSizeMB: 2,
            useWebWorker: true,
        });
    };

    const imageInput = async (files: FileList): Promise<void> => {
        let results: string[];
        if (doCompress) {
            const compressed = await Promise.all(
                Array.from(files).map(compress),
            );
            results = await Promise.all(compressed.map(toBase64));
        } else {
            results = await Promise.all(Array.from(files).map(toBase64));
        }

        loading.value = false;

        const images: Image[] = results.map((base64) => {
            const id = NextImgId.value;
            NextImgId.value = id + 1;
            return { id, base64 };
        });

        AllImages.value = [...AllImages.value, ...images];
        setImages((prev) => [...prev, ...images]);
    };

    const handleInput = async (
        e: TargetedEvent<HTMLInputElement, Event>,
    ): Promise<void> => {
        const files = e.currentTarget.files;
        if (!files) return;
        await imageInput(files);
    };

    const handleCheckbox = (): void => {
        setDoCompress((prev) => !prev);
    };

    const handlePaste = async (e: ClipboardEvent): Promise<void> => {
        const data = e.clipboardData;
        if (!data) return;

        const files = data.files;
        await imageInput(files);
    };

    return (
        <div id="image-dock" onPaste={handlePaste} tabIndex={0}>
            <div>
                <input
                    multiple
                    type="file"
                    accept={
                        doCompress
                            ? '.png,.jpg,.jpeg,.svg,.webp'
                            : '.png,.jpg,.jpeg,.svg,.webp,.gif'
                    }
                    onChange={handleInput}
                />
                <label>
                    Compress:
                    <input
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={doCompress}
                    />
                    (Will break gifs)
                </label>
            </div>
            {loading.value && <p>compressing...</p>}
            <div id="dock-images">
                {images.map((image, index) => (
                    <ImageComponent source={image} key={index} />
                ))}
            </div>
        </div>
    );
}
