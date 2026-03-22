import { signal } from '@preact/signals';

type LevelData = {
    title: string;
    colour: string;
    images: string[];
};

function newLevelData(title: string, colour: string): LevelData {
    return {
        title,
        colour,
        images: [],
    };
}

type Base64 = string;

type Data = {
    levels: LevelData[];
    images: Base64[];
};

function newData(): Data {
    return {
        images: [],
        levels: [],
    };
}

const data = signal<Data>(newData());

const DEFAULT_COLOURS = [
    'gold',
    'darkgreen',
    'green',
    'lightgreen',
    'yellow',
    'orange',
    'red',
] as const;

function randomColour(): string {
    // https://stackoverflow.com/a/1484514/27570543
    const chars = '0123456789ABCDEF';
    const maxHex = 6;

    let colour = '#';
    while (colour.length <= maxHex) {
        colour += chars[Math.floor(Math.random() * chars.length)];
    }

    return colour;
}

export function addLevel(): void {
    const d = data.value;
    const len = d.levels.length;
    const colourLen = DEFAULT_COLOURS.length;
    const rank = len === 0 ? 'S' : String.fromCharCode(64 + len);

    let colour: string;
    if (len < colourLen) {
        colour = DEFAULT_COLOURS[len];
    } else {
        colour = randomColour();
    }

    d.levels.push(newLevelData(rank, colour));
}

export function addImages(images: readonly string[]): void {
    if (images.length !== 0) {
        const d = data.value;
        if (images.length === 1) {
            d.images.push(images[0]);
        } else {
            d.images = [...d.images, ...images];
        }
    }
}

// need file ingesting and image encoding
