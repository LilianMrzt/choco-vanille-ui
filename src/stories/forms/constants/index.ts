import type { CSSProperties } from 'react'

export const FORM_STORY_FRAME_STYLE = {
    boxSizing: 'border-box',
    maxWidth: '100%',
    minWidth: 0,
    overflowX: 'auto',
    width: 'min(24rem, calc(100vw - 2rem))',
} satisfies CSSProperties
