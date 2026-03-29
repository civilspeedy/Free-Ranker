export type LevelData = {
    rank: string;
    fontColour: string;
    colour: string;
    images: Image[];
    readonly index: number;
};

export type Image = {
    readonly id: number;
    readonly base64: string;
};

export type RankAndImageIndex = {
    readonly rank: number;
    readonly image: number;
};
