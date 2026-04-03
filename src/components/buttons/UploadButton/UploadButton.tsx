import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './UploadButton.css';
import type { TargetedEvent } from 'preact';
import type { Data } from '../../../types';
import { ingestJsonFile } from '../../../signals';
import uploadIcon from '../../../assets/upload.svg';

export default function UploadButton(): JSX.Element {
    const [state, setState] = useState(false);

    const Button = (): JSX.Element => {
        const handleClick = (): void => setState((prev) => !prev);
        return (
            <img
                className="upload-button"
                onClick={handleClick}
                src={uploadIcon}
                title="upload json"
                alt="upload json"
            />
        );
    };

    const Modal = (): JSX.Element => {
        const [file, setFile] = useState<File>();
        const [json, setJson] = useState<Data>();

        useEffect(() => {
            if (json) ingestJsonFile(json);
        }, [json]);

        const handleUpload = (e: TargetedEvent<HTMLInputElement, Event>) => {
            const target = e.currentTarget;
            if (target) {
                const files = target.files;
                if (files) setFile(files[0]);
            }
        };

        const handleClose = (): void => setState(false);

        const readFile = async (f: File): Promise<Data> => {
            return new Promise<Data>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsText(f);

                reader.onload = () => {
                    const jsonStr = reader.result as string;
                    resolve(JSON.parse(jsonStr) as Data);
                };

                reader.onerror = (e) => reject(e);
            });
        };

        const handleSubmit = async (): Promise<void> => {
            if (file) {
                try {
                    setJson(await readFile(file));
                } catch (e) {
                    console.error(e);
                }
            }
        };
        return (
            <div className="upload-modal">
                <input type="file" accept=".json" onChange={handleUpload} />
                <div id="option-div">
                    <a className="button" onClick={handleSubmit}>
                        Submit
                    </a>
                    <a className="button" onClick={handleClose}>
                        Close
                    </a>
                </div>
            </div>
        );
    };

    return (
        <>
            <Button />
            {state && <Modal />}
        </>
    );
}
