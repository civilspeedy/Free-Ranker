import type { JSX } from 'preact/jsx-runtime';
import { AllImages, LevelSignal, NextImgId } from '../../../signals';
import type { Data } from '../../../types';
import downloadIcon from '../../../assets/download.svg';

export default function DownloadButton(): JSX.Element {
    const handleClick = (): void => {
        const data: Data = {
            images: AllImages.value,
            levels: LevelSignal.value,
            nextId: NextImgId.value,
        };

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
        <img
            onClick={handleClick}
            className="bright-button"
            src={downloadIcon}
            title="download json"
            alt="download json"
        />
    );
}
