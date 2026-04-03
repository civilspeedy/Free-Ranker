import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';
import './LevelComponent.css';
import DeleteLevel from '../buttons/DeleteLevelButton/DeleteLevelButton';
import EditLevel from '../buttons/EditLevelButton/EditLevelButton';
import { useEffect, useState } from 'preact/hooks';
import { LevelSignal } from '../../signals';

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
            <div
                className="level-rank"
                style={{
                    backgroundColor: colour,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 10,
                    }}
                >
                    <EditLevel index={index} />
                    <DeleteLevel index={index} />
                </div>
                <p
                    style={{
                        fontSize: rank.length < 4 ? null : rankSize,
                        color: fontColour,
                        margin: 0,
                        alignSelf: 'center',
                        userSelect: 'none',
                    }}
                >
                    {' '}
                    {rank}
                </p>
            </div>

            <div id="images">
                {LevelSignal.value[index]?.images.map((image, i) => (
                    <img src={image.base64} key={i} />
                ))}
            </div>
        </div>
    );
}
