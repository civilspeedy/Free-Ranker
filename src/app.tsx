import './app.css';
import AddLevelButton from './components/buttons/AddLevelButton/AddLevelButton';
import { LevelSignal } from './signals';
import UploadButton from './components/buttons/UploadButton/UploadButton';
import LevelComponent from './components/LevelComponent/LevelComponent';
import DownloadButton from './components/buttons/DownloadButton/DownloadButton';
import ImageDock from './components/ImageDock/ImageDock';
import CreateImage from './components/buttons/CreateImageButton/CreateImageButton';
import CopyImage from './components/buttons/CopyImageButton/CopyImageButton';

export default function App() {
    return (
        <>
            <div className="top-corner">
                <UploadButton />
                <DownloadButton />
                <CreateImage />
                <CopyImage />
            </div>
            <div id="level-div">
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
            </div>
            <AddLevelButton />
            <ImageDock />
        </>
    );
}
