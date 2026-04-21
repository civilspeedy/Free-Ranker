import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';
import BurgerIcon from '../../assets/menu.svg';
import UploadButton from '../buttons/UploadButton/UploadButton';
import DownloadButton from '../buttons/DownloadButton/DownloadButton';
import CreateImageButton from '../buttons/CreateImageButton/CreateImageButton';
import CopyImage from '../buttons/CopyImageButton/CopyImageButton';
import './UtilBurger.css';

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
                    <CopyImage />
                </div>
            )}
        </div>
    );
}
