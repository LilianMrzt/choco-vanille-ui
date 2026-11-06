/**
 * Clamps a progress percentage to the supported range.
 * @param value - Progress value.
 * @returns The clamped value.
 * @example
 * clamp(120)
 */
export const clamp = (value: number) => Math.min(100, Math.max(0, value))
