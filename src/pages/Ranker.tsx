import type { JSX } from 'preact/jsx-runtime';
import UtilityBurger from '../components/UtilBurger/UtilBurger';
import { LevelSignal } from '../signals';
import LevelComponent from '../components/LevelComponent/LevelComponent';
import AddLevelButton from '../components/buttons/AddLevelButton/AddLevelButton';
import ImageDock from '../components/ImageDock/ImageDock';

export default function Ranker(): JSX.Element {
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
