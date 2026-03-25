import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

export default function EditLevelButton(): JSX.Element {
    const [state, setState] = useState(false);

    const Button = (): JSX.Element => {
        const handleClick = () => setState((prev) => !prev);
        return <a onClick={handleClick}>Edit</a>;
    };

    const Modal = (): JSX.Element => {
        return <div></div>;
    };

    return (
        <>
            <Button />
            {state && <Modal />}
        </>
    );
}
