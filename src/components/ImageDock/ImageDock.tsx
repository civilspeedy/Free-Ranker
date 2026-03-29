import type { TargetedEvent } from 'preact';
import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './ImageDock.css';
import { addImage, NextImgId, ranks } from '../../signals';
import type { Image } from '../../types';

export default function ImageDock(): JSX.Element {
    const [images, setImages] = useState<Image[]>([]);

    const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (e) => reject(e);
        });

    const handleInput = async (
        e: TargetedEvent<HTMLInputElement, Event>,
    ): Promise<void> => {
        const files = e.currentTarget.files;
        if (!files) return;
        const results = await Promise.all(Array.from(files).map(toBase64));
        const images: Image[] = results.map((base64) => {
            const id = NextImgId.value;
            NextImgId.value = id + 1;
            return { id, base64 };
        });

        setImages((prev) => [...prev, ...images]);
    };

    type ImageProps = { readonly source: Image };
    const Image = ({ source }: ImageProps): JSX.Element => {
        const [state, setState] = useState(false);
        const [selection, setSelection] = useState(ranks.value[0]);

        const handleClick = (): void => {
            setState((prev) => !prev);
        };

        const handleSelect = (
            e: TargetedEvent<HTMLSelectElement, Event>,
        ): void => {
            setSelection(e.currentTarget.value);
        };

        const handleOk = (): void => {
            addImage(selection, source);
        };

        return (
            <div className="image-capsule">
                <img
                    className="dock-image"
                    src={source.base64}
                    onClick={handleClick}
                />
                <div>
                    {state && (
                        <>
                            <select value={selection} onChange={handleSelect}>
                                {ranks.value.map((rank, index) => (
                                    <option key={index} value={rank}>
                                        {rank}
                                    </option>
                                ))}
                            </select>
                            <a onClick={handleOk}>Ok</a>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div id="image-dock">
            <input
                multiple
                type="file"
                accept=".png, .jpeg, .svg"
                onChange={handleInput}
            />
            <div id="images">
                {images.map((image, index) => (
                    <Image source={image} key={index} />
                ))}
            </div>
        </div>
    );
}
