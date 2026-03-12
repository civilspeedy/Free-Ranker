import type { Dispatch, StateUpdater } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

import './AddLevel.css';

type AddLevelProps = {
    readonly levels: readonly string[];
    readonly setLevels: Dispatch<StateUpdater<readonly string[]>>;
};
export default function AddLevel({
    levels,
    setLevels,
}: AddLevelProps): JSX.Element {
    const handlePress = (): void => {
        const len = levels.length;
        const rank = len === 0 ? 'S' : String.fromCharCode(64 + len);
        setLevels((prev) => [...prev, rank]);
    };

    return (
        <a className="add-level" onClick={handlePress}>
            Add Level
        </a>
    );
}
