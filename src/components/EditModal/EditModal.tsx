import type { TargetedEvent } from 'preact';
import { useState, type Dispatch, type StateUpdater } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

import './EditModal.css';

type EditModalProps = {
    readonly setState: Dispatch<StateUpdater<boolean>>;
};
export default function EditModal({ setState }: EditModalProps): JSX.Element {
    const [colour, setColour] = useState<string>();
    const [label, setLabel] = useState<string>();

    const handleColourChange = (
        val: TargetedEvent<HTMLInputElement, Event>,
    ): void => setColour(val.currentTarget.value);

    const handleLabelChange = (
        val: TargetedEvent<HTMLInputElement, Event>,
    ): void => setLabel(val.currentTarget.value);

    const handleClose = (): void => setState((prev) => !prev);

    return (
        <div className="edit-modal">
            <label>
                Level Colour:
                <input type="color" onChange={handleColourChange} />
            </label>
            <input
                type="text"
                placeholder="Level Label"
                onChange={handleLabelChange}
            />
            <a onClick={handleClose}>Close</a>
            <a>Submit</a>
        </div>
    );
}
