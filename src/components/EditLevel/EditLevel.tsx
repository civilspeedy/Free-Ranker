import type { JSX } from 'preact/jsx-runtime';
import * as m from 'motion/react-m';
import { ButtonVariants } from '../../Animations';
import Edit from '../../assets/edit-svgrepo-com.svg';
import EditModal from '../EditModal/EditModal';
import { useState } from 'preact/hooks';

export default function EditLevel(): JSX.Element {
    const [openModal, setOpenModal] = useState(false);
    const handleClick = (): void => setOpenModal((prev) => !prev);

    return (
        <>
            {openModal && <EditModal setState={setOpenModal} />}
            <m.img
                variants={ButtonVariants}
                initial="initial"
                animate="animate"
                whileTap="whileTap"
                whileHover="whileHover"
                src={Edit}
                onClick={handleClick}
            />
        </>
    );
}
