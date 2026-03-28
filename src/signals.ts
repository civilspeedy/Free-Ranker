import { signal } from '@preact/signals';
import type { LevelData } from './types';

export const LevelSignal = signal<LevelData[]>([]);

const DEFUALT_COLOURS = {
    gold: true,
    darkgreen: false,
    green: false,
    lightgreen: true,
    yellow: true,
    orange: true,
    red: false,
} as const;

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

export function getImages(index: number): string[] {
    return LevelSignal.value[index].images;
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

    const colours = Object.keys(DEFUALT_COLOURS);
    const fontColours = Object.values(DEFUALT_COLOURS);

    let colour: string;
    let fontColour: string;
    if (l >= colours.length) {
        colour = randomColour();
        fontColour = randomColour();
    } else {
        colour = colours[l];
        fontColour = fontColours[l] ? 'black' : 'white';
    }

    const newLevel: LevelData = {
        rank,
        colour,
        fontColour,
        images: [],
        index: l,
    };

    LevelSignal.value = [...LevelSignal.value, newLevel];
}

export function removeLevel(index: number): void {
    const l = getLen();

    if (l === 0 || index >= l) return;

    const left = LevelSignal.value.slice(0, index);
    const right = LevelSignal.value.slice(index + 1);

    LevelSignal.value = [...left, ...right];
}

export function getRank(index: number): string {
    return LevelSignal.value[index].rank;
}

export function changeRank(index: number, rank: string): void {
    LevelSignal.value = LevelSignal.value.map((level, i) =>
        i === index ? { ...level, rank } : level,
    );
}

export function getColour(index: number): string {
    return LevelSignal.value[index].colour;
}

export function changeColour(index: number, colour: string): void {
    LevelSignal.value = LevelSignal.value.map((level, i) =>
        i === index ? { ...level, colour } : level,
    );
}

export function getFontColour(index: number): string {
    return LevelSignal.value[index].fontColour;
}
export function changeFontColour(index: number, fontColour: string): void {
    LevelSignal.value = LevelSignal.value.map((level, i) =>
        i === index ? { ...level, fontColour } : level,
    );
}
