import type { JSX } from 'preact/jsx-runtime';
import copyIcon from '../../../assets/clipboard.svg';
import { render } from 'preact';
import { CaptureComponent } from '../../CaptureComponent/CaptureComponent';
import { LevelSignal } from '../../../signals';
import html2canvas from 'html2canvas';

export default function CopyImageButton(): JSX.Element {
    const handleClick = async (): Promise<void> => {
        const container = document.createElement('div');
        container.style.cssText =
            'position:fixed;left:-9999px;top:-9999px;pointer-events:none;';
        document.body.appendChild(container);

        await new Promise<void>((resolve) => {
            render(
                <CaptureComponent
                    levels={LevelSignal.value}
                    onMounted={async (e) => {
                        const canvas = await html2canvas(e, {
                            scale: 2,
                            useCORS: true,
                            backgroundColor: '#ffffff',
                        });
                        canvas.toBlob(async (blob) => {
                            await navigator.clipboard.write([
                                new ClipboardItem({
                                    'image/png': blob as Blob,
                                }),
                            ]);
                            resolve();
                        });
                    }}
                />,
                container,
            );
        });
    };
    return (
        <img
            className="bright-button"
            src={copyIcon}
            title="copy image"
            onClick={handleClick}
        />
    );
}
