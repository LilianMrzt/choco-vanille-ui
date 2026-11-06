/**
 * Produces CSS declarations that clamp text to a number of lines.
 * @param maxLines - Maximum visible line count.
 * @returns Declarations for multi-line truncation.
 * @example
 * truncateTextStyles(3)
 */
export const truncateTextStyles = (maxLines: number) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical' as const,
    whiteSpace: 'normal' as const,
    overflowWrap: 'break-word' as const,
    wordBreak: 'normal' as const,
})
