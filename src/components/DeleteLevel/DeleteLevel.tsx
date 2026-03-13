import type { JSX } from 'preact/jsx-runtime';
import Trash from '../../assets/trash-svgrepo-com.svg';
import * as m from 'motion/react-m';
import './DeleteLevel.css';
import { deleteIndex } from '../../signals';
import { ButtonVariants } from '../../Animations';

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
            variants={ButtonVariants}
            initial="initial"
            animate="animate"
            whileTap="whileTap"
            whileHover="whileHover"
            onClick={handlePress}
            src={Trash}
        />
    );
}
