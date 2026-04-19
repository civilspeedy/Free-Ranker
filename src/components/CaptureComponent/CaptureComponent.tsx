import { useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import type { LevelData } from '../../types';
import '../LevelComponent/LevelComponent.css';
import './CaptureComponent.css';

type CaptureComponentProps = {
    levels: LevelData[];
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
        <div id="level">
            <p
                className="level-rank"
                style={{ color: fontColour, backgroundColor: backgroundColour }}
            >
                {rank}
            </p>
            <div id="images">
                {images.map((image, index) => (
                    <img src={image} key={index} />
                ))}
            </div>
        </div>
    );
}

export function CaptureComponent({
    levels,
    onMounted,
}: CaptureComponentProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) onMounted(ref.current);
    }, []);

    return (
        <div id="capture-component" ref={ref}>
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
