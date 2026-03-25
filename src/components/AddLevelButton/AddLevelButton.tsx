import type { JSX } from 'preact/jsx-runtime';
import { addLevel } from '../../signals';
import './AddLevelButton.css';

export default function AddLevelButton(): JSX.Element {
    const handleClick = (): void => {
        console.log('click');
        addLevel();
    };
    return (
        <a className="add-level-button" onClick={handleClick}>
            Add Level
        </a>
    );
}
