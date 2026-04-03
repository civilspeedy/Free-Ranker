// CreateImageButton.tsx
import { render } from 'preact';
import html2canvas from 'html2canvas';
import type { JSX } from 'preact/jsx-runtime';
import imageIcon from '../../../../public/image.svg';
import { CaptureComponent } from '../../CaptureComponent/CaptureComponent';

import './CreateImageButton.css';
import { LevelSignal } from '../../../signals';

export default function CreateImageButton(): JSX.Element {
    const handleClick = async (): Promise<void> => {
        const resolution = { width: 1920, height: 1080 };

        const container = document.createElement('div');
        container.style.cssText =
            'position:fixed;left:-9999px;top:-9999px;pointer-events:none;';
        document.body.appendChild(container);

        await new Promise<void>((resolve) => {
            // not going to pretend I wrote this, thanks claud - hope you're enjoying the open sourcing
            render(
                <CaptureComponent
                    levels={LevelSignal.value}
                    resolution={resolution}
                    onMounted={async (el) => {
                        const canvas = await html2canvas(el, {
                            scale: 2,
                            useCORS: true,
                            backgroundColor: '#ffffff',
                        });

                        const link = document.createElement('a');
                        link.download = 'tierlist.jpeg';
                        link.href = canvas.toDataURL('image/jpeg');
                        link.click();

                        render(null, container);
                        document.body.removeChild(container);
                        resolve();
                    }}
                />,
                container,
            );
        });
    };

    return (
        <img
            title="create image"
            src={imageIcon}
            className="create-button"
            onClick={handleClick}
        />
    );
}
