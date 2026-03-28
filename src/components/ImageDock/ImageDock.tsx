import type { TargetedEvent } from 'preact';
import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './ImageDock.css';
import { addImage, getRanks } from '../../signals';

export default function ImageDock(): JSX.Element {
    const [images, setImages] = useState<string[]>([]);

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
        setImages((prev) => [...prev, ...results]);
    };

    type ImageProps = { readonly source: string };
    const Image = ({ source }: ImageProps): JSX.Element => {
        const [state, setState] = useState(false);
        const [selection, setSelection] = useState(getRanks()[0]);

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
            // needs to check if in other rank
            // needs to check if image is already in array
        };

        return (
            <div className="image-capsule">
                <img
                    className="dock-image"
                    src={source}
                    onClick={handleClick}
                />
                <div>
                    {state && (
                        <>
                            <select value={selection} onChange={handleSelect}>
                                {getRanks().map((rank, index) => (
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
