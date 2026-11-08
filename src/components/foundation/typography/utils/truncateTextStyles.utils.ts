/**
 * Produces CSS declarations that clamp text to a number of lines.
 * @param maxLines - Optional maximum line count; omitted when supplied dynamically.
 * @returns Declarations for multi-line truncation.
 * @example
 * truncateTextStyles(3)
 */
export const truncateTextStyles = (maxLines?: number) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    ...(maxLines === undefined ? {} : { WebkitLineClamp: maxLines }),
    WebkitBoxOrient: 'vertical' as const,
    whiteSpace: 'normal' as const,
    overflowWrap: 'break-word' as const,
    wordBreak: 'normal' as const,
})
