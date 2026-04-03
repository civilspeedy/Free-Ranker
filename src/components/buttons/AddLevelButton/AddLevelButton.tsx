import type { JSX } from 'preact/jsx-runtime';
import './AddLevelButton.css';
import { addLevel } from '../../../signals';
import addIcon from '../../../assets/plus-circle.svg';

export default function AddLevelButton(): JSX.Element {
    const handleClick = (): void => {
        console.log('click');
        addLevel();
    };
    return (
        <img
            src={addIcon}
            className="add-level-button"
            onClick={handleClick}
            title="add level"
        />
    );
}
