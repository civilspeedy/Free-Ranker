import { signal } from '@preact/signals';
import type { LevelData } from './types';

export const LevelSignal = signal<LevelData[]>([]);

const DEFUALT_COLOURS: readonly string[] = [
    'gold',
    'darkgreen',
    'green',
    'lightgreen',
    'yellow',
    'orange',
    'red',
];

function getLen(): number {
    return LevelSignal.value.length;
}

function randomColour(): string {
    // https://stackoverflow.com/a/1484514/27570543
    const chars = '0123456789ABCDEF';
    const maxChars = 6;
    let c = '#';
    while (c.length <= maxChars) {
        c += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return c;
}

export function addLevel(): void {
    console.log('adding level');
    const l = getLen();
    let rank: string;
    if (l === 0) {
        rank = 'S';
    } else {
        rank = String.fromCharCode(64 + l);
    }

    let colour: string;
    if (l >= DEFUALT_COLOURS.length) {
        colour = randomColour();
    } else {
        colour = DEFUALT_COLOURS[l];
    }

    const newLevel: LevelData = { rank, colour, images: [] };

    LevelSignal.value = [...LevelSignal.value, newLevel];
}

export function removeLevel(index: number): void {
    const l = getLen();

    if (l === 0 || index >= l) return;

    const left = LevelSignal.value.slice(0, index);
    const right = LevelSignal.value.slice(index + 1);

    LevelSignal.value = [...left, ...right];
}
