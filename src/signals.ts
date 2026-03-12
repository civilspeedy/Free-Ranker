import { signal } from '@preact/signals';

export const deleteIndex = signal<number>();
export const globalLevels = signal<readonly string[]>();

/**
 * Signal used to show which image is to move to a level and what level it is being moved to.
 */
export const sendImage = signal<{ image: string; level: string }>();
