import type { JSX } from 'preact/jsx-runtime';
import './app.css';
import { useEffect, useState } from 'preact/hooks';
import Level from './components/Level/Level';
import ImageDock from './components/ImageDock/ImageDock';
import AddLevel from './components/AddLevel/AddLevel';
import { domAnimation, LazyMotion } from 'motion/react';
import { deleteIndex, globalLevels } from './signals';

const colours: readonly string[] = [
    'gold',
    'darkgreen',
    'green',
    'lightgreen',
    'yellow',
    'orange',
    'red',
];

const FontColoursIsBlack: boolean[] = [
    true,
    false,
    false,
    true,
    true,
    true,
    false,
];

if (FontColoursIsBlack.length !== colours.length)
    console.error('Colour arrays do not align');

export function App(): JSX.Element {
    const [levels, setLevels] = useState<readonly string[]>([]);

    useEffect(() => {
        if (deleteIndex.value !== undefined) {
            if (levels.length === 0) {
                setLevels([]);
            } else {
                setLevels((prev) => [
                    ...prev.slice(0, deleteIndex.value),
                    ...prev.slice(
                        deleteIndex.value ? deleteIndex.value + 1 : 0,
                    ),
                ]);
            }

            deleteIndex.value = undefined;
        }
    }, [deleteIndex.value]);

    useEffect(() => {
        globalLevels.value = levels;
    }, [levels]);

    return (
        <LazyMotion features={domAnimation}>
            <div className="page">
                <AddLevel levels={levels} setLevels={setLevels} />
                {levels.map((label, index) => (
                    <Level
                        index={index}
                        label={label}
                        colour={index < colours.length ? colours[index] : 'red'}
                        fontColour={
                            FontColoursIsBlack[index] ? 'black' : 'white'
                        }
                        key={index}
                    />
                ))}
                <ImageDock />
            </div>
        </LazyMotion>
    );
}
