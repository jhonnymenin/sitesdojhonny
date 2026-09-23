// Shared animation config for consistent motion across sections
export const ease = [0.2, 0, 0, 1] as const;
export const transition = { duration: 0.6, ease: ease as unknown as [number, number, number, number] };
export const staggerChild = (i: number) => ({ ...transition, delay: 0.1 * i });
