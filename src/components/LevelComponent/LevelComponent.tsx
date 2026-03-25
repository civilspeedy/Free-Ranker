import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';
import { removeLevel } from '../../signals';

export default function LevelComponent({
    rank,
    colour,
    images,
    index,
}: LevelData): JSX.Element {
    const DeleteLevel = (): JSX.Element => {
        return <a onClick={() => removeLevel(index)}>Delete</a>;
    };

    return (
        <div>
            <p style={{ backgroundColor: colour }}>{rank}</p>
            <DeleteLevel />
            {images.map((image, index) => (
                <img src={image} key={index} />
            ))}
        </div>
    );
}
