import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';
import { removeLevel } from '../../signals';
import './LevelComponent.css';
import { useState } from 'preact/hooks';

export default function LevelComponent({
    rank,
    colour,
    images,
    index,
}: LevelData): JSX.Element {
    const DeleteLevel = (): JSX.Element => {
        return <a onClick={() => removeLevel(index)}>Delete</a>;
    };

    const Rank = (): JSX.Element => {
        const [state, setState] = useState(false);

        const handleClick = () => {
            setState((prev) => !prev);
            // needs to not change if user hasn't input
        };

        return state ? (
            <textarea className="level-rank" onClick={handleClick} />
        ) : (
            <a
                className="level-rank"
                onClick={handleClick}
                style={{ backgroundColor: colour }}
            >
                {rank}
            </a>
        );
    };

    return (
        <div id="level">
            <Rank />
            <DeleteLevel />
            <div id="images">
                {images.map((image, index) => (
                    <img src={image} key={index} />
                ))}
            </div>
        </div>
    );
}
