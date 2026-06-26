import { keyframes } from '@vanilla-extract/css'

export const slideUpOut = keyframes({
    from: { opacity: 1, transform: 'translateY(0) scale(1)' },
    to: { opacity: 0, transform: 'translateY(6px) scale(0.97)' },
})
