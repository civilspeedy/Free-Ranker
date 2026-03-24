import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';

export default function LevelComponent({
    rank,
    colour,
    images,
}: LevelData): JSX.Element {
    return (
        <div>
            <p style={{ backgroundColor: colour }}>{rank}</p>
            {images.map((image, index) => (
                <img src={image} key={index} />
            ))}
        </div>
    );
}
