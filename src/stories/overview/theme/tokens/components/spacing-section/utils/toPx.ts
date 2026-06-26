/**
 * Converts a CSS rem value to its px equivalent (assuming 1rem = 16px).
 * Returns null for values already in px or equal to '0'.
 */
export const toPx = (value: string): string | null => {
    if (value === '0') { return null }
    if (value.endsWith('px')) { return null }
    if (value.endsWith('rem')) { return `${parseFloat(value) * 16}px` }
    return null
}
