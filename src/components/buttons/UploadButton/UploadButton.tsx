import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './UploadButton.css';

export default function UploadButton(): JSX.Element {
    const [state, setState] = useState(false);

    const Button = (): JSX.Element => {
        const handleClick = (): void => setState((prev) => !prev);
        return (
            <a className="upload-button" onClick={handleClick}>
                Upload Schema
            </a>
        );
    };

    const Modal = (): JSX.Element => {
        const handleClose = (): void => setState(false);
        const handleSubmit = (): void => {};
        return (
            <div className="upload-modal">
                <input type="file" accept=".json" />
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
