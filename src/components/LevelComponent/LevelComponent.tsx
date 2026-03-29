import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';
import './LevelComponent.css';
import DeleteLevel from '../buttons/DeleteLevelButton/DeleteLevelButton';
import EditLevel from '../buttons/EditLevelButton/EditLevelButton';
import { useEffect, useState } from 'preact/hooks';
import { getImages } from '../../signals';

export default function LevelComponent({
    rank,
    colour,
    fontColour,
    index,
}: LevelData): JSX.Element {
    const [rankSize, setRankSize] = useState('');

    useEffect(() => {
        switch (rank.length) {
            case 1:
            case 2:
            case 3:
                setRankSize('10vh');
                break;
            case 4:
                setRankSize('8vh');
                break;
            case 5:
                setRankSize('7vh');
                break;
            case 6:
                setRankSize('6vh');
                break;
            default:
                setRankSize('3vh');
                break;
        }
    }, [rank]);

    return (
        <div id="level">
            <p
                className="level-rank"
                style={{
                    backgroundColor: colour,
                    fontSize: rank.length < 4 ? null : rankSize,
                    color: fontColour,
                }}
            >
                {rank}
            </p>
            <EditLevel index={index} />
            <DeleteLevel index={index} />
            <div id="images">
                {getImages(index).map((image, index) => (
                    <img src={image} key={index} />
                ))}
            </div>
        </div>
    );
}
