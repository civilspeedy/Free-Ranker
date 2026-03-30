import { computed, signal } from '@preact/signals';
import type { Data, Image, LevelData, RankAndImageIndex } from './types';

export const LevelSignal = signal<LevelData[]>([]);
export const AllImages = signal<Image[]>([]);
export const NextImgId = signal<number>(0);

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
    return LevelSignal.value[index].images.map((image) => image.base64);
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

export const ranks = computed(() => LevelSignal.value.map((l) => l.rank));

function getRankIndex(rank: string): number {
    for (const level of LevelSignal.value) {
        if (level.rank === rank) return level.index;
    }
    return -1;
}

function imageInOtherLevel(
    ignoreRank: string,
    id: number,
): RankAndImageIndex | null {
    for (const level of LevelSignal.value) {
        if (level.rank !== ignoreRank) {
            for (const image of level.images) {
                if (image.id === id)
                    return {
                        rank: level.index,
                        image: level.images.indexOf(image),
                    };
            }
        }
    }
    return null;
}

function removeImage(i: RankAndImageIndex): void {
    const images = LevelSignal.value[i.rank].images;
    const left = images.slice(0, i.image);
    const right = images.slice(i.image + 1);
    const newImages = [...left, ...right];

    LevelSignal.value = LevelSignal.value.map((level) =>
        level.index === i.rank ? { ...level, images: newImages } : level,
    );
}

function checkDuplicate(rankIndex: number, imageId: number): boolean {
    for (const image of LevelSignal.value[rankIndex].images) {
        if (image.id === imageId) return true;
    }
    return false;
}

export function addImage(rank: string, image: Image): void {
    if (checkDuplicate(getRankIndex(rank), image.id)) return;

    const isInOther = imageInOtherLevel(rank, image.id);

    if (isInOther !== null) {
        removeImage(isInOther);
    }

    LevelSignal.value = LevelSignal.value.map((level) =>
        level.rank === rank
            ? { ...level, images: [...level.images, image] }
            : level,
    );
}

export function ingestJsonFile(json: Data): void {
    LevelSignal.value = json.levels;
    AllImages.value = json.images;
    NextImgId.value = json.nextId;
}
