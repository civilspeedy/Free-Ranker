import type { JSX } from 'preact/jsx-runtime';
import * as m from 'motion/react-m';
import { ButtonVariants } from '../../Animations';
import Edit from '../../assets/edit-svgrepo-com.svg';
import EditModal from '../EditModal/EditModal';
import { useState, type Dispatch, type StateUpdater } from 'preact/hooks';

type EditLevelProps = {
    readonly setLevelLabel: Dispatch<StateUpdater<string>>;
    readonly setLevelColour: Dispatch<StateUpdater<string>>;
};
export default function EditLevel({
    setLevelColour,
    setLevelLabel,
}: EditLevelProps): JSX.Element {
    const [openModal, setOpenModal] = useState(false);
    const handleClick = (): void => setOpenModal((prev) => !prev);

    return (
        <>
            {openModal && (
                <EditModal
                    setLevelColour={setLevelColour}
                    setLevelLabel={setLevelLabel}
                    setState={setOpenModal}
                />
            )}
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
