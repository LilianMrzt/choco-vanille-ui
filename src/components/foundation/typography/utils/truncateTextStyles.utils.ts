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
