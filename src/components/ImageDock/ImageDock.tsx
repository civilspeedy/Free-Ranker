import type { TargetedEvent } from 'preact';
import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './ImageDock.css';
import { AllImages, NextImgId } from '../../signals';
import type { Image } from '../../types';
import imageCompression from 'browser-image-compression';
import { signal } from '@preact/signals';
import ImageComponent from './Image';

const loading = signal<boolean>(false);

export default function ImageDock(): JSX.Element {
    const [images, setImages] = useState<Image[]>([]);
    const [doCompress, setDoCompress] = useState(false);

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

    const handleInput = async (
        e: TargetedEvent<HTMLInputElement, Event>,
    ): Promise<void> => {
        const files = e.currentTarget.files;
        if (!files) return;

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

    const handleCheckbox = (): void => {
        setDoCompress((prev) => !prev);
    };

    return (
        <div id="image-dock">
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
            <div id="images">
                {AllImages.value.map((image, index) => (
                    <ImageComponent source={image} key={index} />
                ))}
            </div>
        </div>
    );
}
