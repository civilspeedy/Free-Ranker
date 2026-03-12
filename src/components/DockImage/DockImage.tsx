import type { JSX } from 'preact/jsx-runtime';
import type { TargetedEvent } from 'preact';

import './DockImage.css';
import { globalLevels, sendImage } from '../../signals';

type DockImageProps = {
    readonly source: string;
};
export default function DockImage({ source }: DockImageProps): JSX.Element {
    const handleChange = (
        val: TargetedEvent<HTMLSelectElement, Event>,
    ): void => {
        const input: string = val.currentTarget.value;
        sendImage.value = { image: source, level: input };
    };

    return (
        <div className="dock-image">
            <label>
                Send to:
                <select defaultValue={''} onChange={handleChange}>
                    <option></option>
                    {globalLevels.value?.map((level, index) => (
                        <option key={index} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </label>
            <img src={source} loading="eager" />
        </div>
    );
}
