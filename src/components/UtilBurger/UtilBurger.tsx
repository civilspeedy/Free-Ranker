import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import BurgerIcon from '../../assets/menu.svg';
import UploadButton from '../buttons/UploadButton/UploadButton';
import DownloadButton from '../buttons/DownloadButton/DownloadButton';
import CreateImageButton from '../buttons/CreateImageButton/CreateImageButton';
import CopyImageButton from '../buttons/CopyImageButton/CopyImageButton';
import './UtilBurger.css';
import AboutButton from '../buttons/AboutButton/AboutButton';

export default function UtilityBurger(): JSX.Element {
    const [state, setState] = useState(false);

    const handleClick = (): void => {
        setState((prev) => !prev);
    };

    return (
        <div>
            <img
                className="bright-button"
                src={BurgerIcon}
                alt="Utility"
                title="Utility"
                onClick={handleClick}
            />
            {state && (
                <div id="burger-modal">
                    <UploadButton />
                    <DownloadButton />
                    <CreateImageButton />
                    <CopyImageButton />
                    <AboutButton />
                </div>
            )}
        </div>
    );
}
