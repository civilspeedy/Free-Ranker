import type { JSX } from 'preact/jsx-runtime';
import { getImages, removeLevel } from '../../../signals';
import './DeleteLevelButton.css';
import { useState } from 'preact/hooks';
import deleteIcon from '../../../assets/trash-2.svg';
import confirmIcon from '../../../assets/check-circle.svg';
import cancelIcon from '../../../assets/x-circle.svg';

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
            <img
                className="button"
                onClick={handleClick}
                src={deleteIcon}
                alt="delete"
                title="delete"
                style={{ opacity: 0.5 }}
            />
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
                <label>Are you sure?</label>
                <div className="options">
                    <img
                        className="button"
                        onClick={handleYes}
                        src={confirmIcon}
                        title="confirm"
                    />

                    <img
                        className="button"
                        onClick={handleNo}
                        src={cancelIcon}
                        title="cancel"
                    />
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
