import type { JSX } from 'preact/jsx-runtime';
import { addLevel } from '../../signals';

export default function AddLevelButton(): JSX.Element {
    const handleClick = (): void => {
        console.log('click');
        addLevel();
    };
    return <a onClick={handleClick}>Add Level</a>;
}
