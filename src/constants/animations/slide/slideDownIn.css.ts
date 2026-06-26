import { keyframes } from '@vanilla-extract/css'

export const slideDownIn = keyframes({
    from: { opacity: 0, transform: 'translateY(-6px) scale(0.97)' },
    to: { opacity: 1, transform: 'translateY(0) scale(1)' },
})
