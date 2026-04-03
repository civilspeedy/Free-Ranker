import { useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';

type CaptureComponentProps = {
    levels: LevelData[];
    resolution: { width: number; height: number };
    onMounted: (el: HTMLElement) => void;
};

type CaptureLevelProps = {
    fontColour: string;
    backgroundColour: string;
    rank: string;
    images: string[];
};

function CaptureLevel({
    fontColour,
    backgroundColour,
    rank,
    images,
}: CaptureLevelProps): JSX.Element {
    return (
        <div>
            <p style={{ color: fontColour, backgroundColor: backgroundColour }}>
                {rank}
            </p>
            <div>
                {images.map((image, index) => (
                    <img src={image} key={index} />
                ))}
            </div>
        </div>
    );
}

export function CaptureComponent({
    levels,
    resolution,
    onMounted,
}: CaptureComponentProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) onMounted(ref.current);
    }, []);

    return (
        <div
            ref={ref}
            style={{ width: resolution.width, height: resolution.height }}
        >
            {levels.map((level, index) => (
                <CaptureLevel
                    key={index}
                    rank={level.rank}
                    backgroundColour={level.colour}
                    fontColour={level.fontColour}
                    images={level.images.map((image) => image.base64)}
                />
            ))}
        </div>
    );
}
