import type { JSX } from 'preact/jsx-runtime';
import { AllImages, LevelSignal, NextImgId } from '../../../signals';

export default function DownloadButton(): JSX.Element {
    const handleClick = (): void => {
        const data = {
            images: AllImages.value,
            level: LevelSignal.value,
            nextId: NextImgId.value,
        } as const;

        const blob = new Blob([JSON.stringify(data)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = Date.now().toString();
        a.download = `${date}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };
    return (
        <a onClick={handleClick} className="bright-button">
            Download Schema
        </a>
    );
}
