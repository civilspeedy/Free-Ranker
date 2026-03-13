import { useEffect, useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import './Level.css';
import DeleteLevel from '../DeleteLevel/DeleteLevel';
import { deleteIndex, sendImage } from '../../signals';
import EditLevel from '../EditLevel/EditLevel';

type LevelProps = {
    readonly label: string;
    readonly colour: string;
    readonly fontColour: string;
    readonly index: number;
};
export default function Level({
    label,
    colour,
    fontColour,
    index,
}: LevelProps): JSX.Element {
    const [items, setItems] = useState<readonly string[]>([]);

    useEffect(() => {
        if (sendImage.value !== undefined) {
            const obj = sendImage.value;
            if (obj.level === label) {
                setItems((prev) => [...prev, obj.image]);
            } else if (items.includes(obj.image)) {
                const i = items.indexOf(obj.image);
                setItems((prev) => [...prev.slice(0, i), ...prev.slice(i + 1)]);
            }
        }
    }, [sendImage.value]);

    useEffect(() => {
        if (deleteIndex.value === index) {
            setItems([]);
        }
    }, [deleteIndex.value]);

    return (
        <div className="level">
            <div
                style={{ backgroundColor: colour, color: fontColour }}
                className="side"
            >
                <p>{label}</p>
                <DeleteLevel index={index} />
                <EditLevel />
            </div>
            <div className="item-div">
                {items.map((image, index) => (
                    <img className="level-item" src={image} key={index} />
                ))}
            </div>
        </div>
    );
}
