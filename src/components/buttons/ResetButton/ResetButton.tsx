import type { JSX } from 'preact/jsx-runtime';
import ResetIcon from '../../../assets/rotate-ccw.svg';

export default function Reset(): JSX.Element {
    return <img className="button" src={ResetIcon} alt="reset" title="reset" />;
}
