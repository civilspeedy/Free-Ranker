import type { JSX } from 'preact/jsx-runtime';
import Trash from '../../assets/trash-svgrepo-com.svg';
import * as m from 'motion/react-m';
import './DeleteLevel.css';
import { deleteIndex } from '../../signals';

type DeleteLevelProps = {
    readonly index: number;
};
export default function DeleteLevel({ index }: DeleteLevelProps): JSX.Element {
    const handlePress = (): void => {
        deleteIndex.value = index;
        console.log('deleting level: ', index);
    };

    return (
        <m.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1, scale: 1.5 }}
            whileTap={{ scale: 0.8 }}
            onClick={handlePress}
            src={Trash}
        />
    );
}
