import { useEffect } from 'preact/hooks';
import './app.css';
import AddLevelButton from './components/AddLevelButton/AddLevelButton';
import LevelComponent from './components/LevelComponent/levelComponent';
import { LevelSignal } from './signals';

export function App() {
    useEffect(() => {
        console.log(LevelSignal.value.length);
    }, [LevelSignal.value]);
    return (
        <>
            {LevelSignal.value.map((level, index) => (
                <LevelComponent
                    key={index}
                    rank={level.rank}
                    images={level.images}
                    colour={level.colour}
                />
            ))}
            <AddLevelButton />
        </>
    );
}
