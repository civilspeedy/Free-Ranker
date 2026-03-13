import type { Variants } from 'motion';

export const ButtonVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
    whileHover: { opacity: 1, scale: 1.2 },
    whileTap: { scale: 0.8 },
};
