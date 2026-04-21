import './app.css';
import AddLevelButton from './components/buttons/AddLevelButton/AddLevelButton';
import { LevelSignal } from './signals';
import LevelComponent from './components/LevelComponent/LevelComponent';
import ImageDock from './components/ImageDock/ImageDock';

import UtilityBurger from './components/UtilBurger/UtilBurger';

export default function App() {
    return (
        <>
            <div className="top-corner">
                <UtilityBurger />
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
