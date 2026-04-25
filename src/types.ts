export type LevelData = {
    rank: string;
    fontColour: string;
    colour: string;
    images: Image[];
    readonly index: number;
};

export type Image = Readonly<{
    id: number;
    base64: string;
}>;

export type RankAndImageIndex = Readonly<{
    rank: number;
    image: number;
}>;

export type Data = Readonly<{
    images: Image[];
    levels: LevelData[];
    nextId: number;
}>;

export type ImageAndFunc = {
    [key: string]: {
        readonly imageSource: string;
        readonly func: (() => void) | (() => Promise<void>);
    };
};
