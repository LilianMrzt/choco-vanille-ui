import { keyframes } from '@vanilla-extract/css'

export const slideLeftOut = keyframes({
    from: { opacity: 1, transform: 'translateX(0) scale(1)' },
    to: { opacity: 0, transform: 'translateX(6px) scale(0.97)' },
})
