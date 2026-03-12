import type { JSX } from 'preact/jsx-runtime';
import './ImageDock.css';
import { useState } from 'preact/hooks';
import DockImage from '../DockImage/DockImage';
import type { TargetedClipboardEvent, TargetedEvent } from 'preact';

export default function ImageDock(): JSX.Element {
    const [images, setImages] = useState<readonly string[]>([]);

    const handleUpload = (files: FileList | null) => {
        if (files) {
            const fileArray = Array.from(files);

            const imageArray: string[] = [];
            for (const file of fileArray) {
                imageArray.push(URL.createObjectURL(file));
            }

            setImages((prev) => [...prev, ...imageArray]);
        }
    };

    const PasteArea = (): JSX.Element => {
        const handlePaste = (
            val: TargetedClipboardEvent<HTMLDivElement>,
        ): void => {
            const files = val.clipboardData?.files;
            handleUpload(files ? files : null);
        };
        return (
            <div onPaste={handlePaste}>Cntrl/CMD+V to paste from clipboard</div>
        );
    };

    return (
        <div className="ImageDock">
            <input
                multiple
                type="file"
                accept="image.png, image/jpeg"
                onChange={(files: TargetedEvent<HTMLInputElement, Event>) =>
                    handleUpload(files.currentTarget.files)
                }
            />
            <PasteArea />
            <div className="image-display">
                {images.map((image, index) => (
                    <DockImage source={image} key={index} />
                ))}
            </div>
        </div>
    );
}
