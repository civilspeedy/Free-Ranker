import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

export default function UploadButton(): JSX.Element {
    const [state, setState] = useState(false);

    const handleClick = () => setState((prev) => !prev);
    // make positions absolute
    return (
        <>
            <a onClick={handleClick}>Upload</a>;
            {state && (
                <div>
                    <input type="file" accept=".json" />
                </div>
            )}
        </>
    );
}
