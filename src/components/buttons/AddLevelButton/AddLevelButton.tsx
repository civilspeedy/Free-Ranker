import type { JSX } from 'preact/jsx-runtime';
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
            className="glow-button"
            onClick={handleClick}
            title="add level"
        />
    );
}
