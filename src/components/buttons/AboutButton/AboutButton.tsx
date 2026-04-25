import type { JSX } from 'preact/jsx-runtime';
import aboutIcon from '../../../assets/help-circle.svg';

export default function AboutButton(): JSX.Element {
    return (
        <a href="/about">
            <img src={aboutIcon} className="bright-button" />
        </a>
    );
}
