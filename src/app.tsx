import { useEffect } from 'preact/hooks';
import './app.css';
import AddLevelButton from './components/buttons/AddLevelButton/AddLevelButton';
import { LevelSignal } from './signals';
import UploadButton from './components/buttons/UploadButton/UploadButton';
import LevelComponent from './components/LevelComponent/LevelComponent';
import DownloadButton from './components/buttons/DownloadButton/DownloadButton';

export default function App() {
    useEffect(() => {
        console.log(LevelSignal.value.length);
    }, [LevelSignal.value]);
    return (
        <>
            <div className="top-corner">
                <UploadButton />
                <DownloadButton />
            </div>
            {LevelSignal.value.map((level, index) => (
                <LevelComponent
                    index={index}
                    key={index}
                    fontColour={level.fontColour}
                    rank={level.rank}
                    images={level.images}
                    colour={level.colour}
                />
            ))}
            <AddLevelButton />
        </>
    );
}
