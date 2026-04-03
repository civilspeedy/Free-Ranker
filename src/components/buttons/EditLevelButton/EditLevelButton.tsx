import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './EditLevelButton.css';
import editIcon from '../../../../public/edit-2.svg';
import {
    changeColour,
    changeFontColour,
    changeRank,
    getColour,
    getFontColour,
    getRank,
} from '../../../signals';
import type { TargetedEvent } from 'preact';

type EditLevelProps = {
    readonly index: number;
};

export default function EditLevel({ index }: EditLevelProps): JSX.Element {
    const [state, setState] = useState(false);

    const Button = (): JSX.Element => {
        const handleClick = () => setState((prev) => !prev);
        return (
            <img
                className="button"
                style={{ opacity: 0.5 }}
                onClick={handleClick}
                src={editIcon}
                title="edit"
                alt="edit"
            />
        );
    };

    const Modal = (): JSX.Element => {
        const handleCancel = (): void => {
            setState(false);
        };

        const [colour, setColour] = useState(getColour(index));
        const [rank, setRank] = useState(getRank(index));
        const [fontColour, setFontColour] = useState(getFontColour(index));

        const handleColour = (
            e: TargetedEvent<HTMLInputElement, Event>,
        ): void => {
            setColour(e.currentTarget.value);
        };

        const handleRank = (
            e: TargetedEvent<HTMLTextAreaElement, Event>,
        ): void => {
            setRank(e.currentTarget.value);
        };

        const handleFontColour = (
            e: TargetedEvent<HTMLInputElement, Event>,
        ): void => {
            setFontColour(e.currentTarget.value);
        };

        const handleConfirm = () => {
            changeColour(index, colour);
            changeFontColour(index, fontColour);
            if (rank !== '') changeRank(index, rank);
            setState(false);
        };

        return (
            <div className="modal">
                <label>
                    Rank: <textarea value={rank} onInput={handleRank} />
                </label>
                <label>
                    Colour:{' '}
                    <input
                        type="color"
                        value={colour}
                        onChange={handleColour}
                    />
                </label>
                <label>
                    Font Colour{' '}
                    <input
                        type="color"
                        value={fontColour}
                        onChange={handleFontColour}
                    />
                </label>
                <div className="options">
                    <a className="button" onClick={handleConfirm}>
                        Confirm
                    </a>
                    <a className="button" onClick={handleCancel}>
                        Cancel
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
