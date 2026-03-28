import type { JSX } from 'preact/jsx-runtime';
import { getImages, removeLevel } from '../../../signals';
import './DeleteLevelButton.css';
import { useState } from 'preact/hooks';

type DeleteLevelProps = {
    readonly index: number;
};
export default function DeleteLevel({ index }: DeleteLevelProps): JSX.Element {
    const [state, setState] = useState(false);

    const Button = (): JSX.Element => {
        const handleClick = (): void => {
            if (getImages(index).length === 0) {
                removeLevel(index);
            } else {
                setState((prev) => !prev);
            }
        };

        return (
            <a className="button" onClick={handleClick}>
                Delete
            </a>
        );
    };

    const Modal = (): JSX.Element => {
        const handleNo = (): void => {
            setState(false);
        };

        const handleYes = (): void => {
            removeLevel(index);
            setState(false);
        };

        return (
            <div className="modal">
                <p>Are you sure?</p>
                <div className="options">
                    <a className="button" onClick={handleYes}>
                        Yes
                    </a>
                    <a className="button" onClick={handleNo}>
                        No
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
