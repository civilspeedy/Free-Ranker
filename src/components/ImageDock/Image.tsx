import { useState } from 'preact/hooks';
import type { Image } from '../../types';
import { addImage, ranks } from '../../signals';
import type { JSX } from 'preact/jsx-runtime';
import type { TargetedEvent } from 'preact';

type ImageProps = { readonly source: Image };
export default function ImageComponent({ source }: ImageProps): JSX.Element {
    const [state, setState] = useState(false);
    const [selection, setSelection] = useState(ranks.value[0]);

    const handleClick = (): void => {
        setState((prev) => !prev);
    };

    const handleSelect = (e: TargetedEvent<HTMLSelectElement, Event>): void => {
        setSelection(e.currentTarget.value);
    };

    const handleOk = (): void => {
        addImage(selection, source);
    };

    return (
        <div className="image-capsule">
            <img
                className="dock-image"
                src={source.base64}
                onClick={handleClick}
            />
            <div>
                {state && (
                    <>
                        <select value={selection} onChange={handleSelect}>
                            {ranks.value.map((rank, index) => (
                                <option key={index} value={rank}>
                                    {rank}
                                </option>
                            ))}
                        </select>
                        <a onClick={handleOk}>Ok</a>
                    </>
                )}
            </div>
        </div>
    );
}
