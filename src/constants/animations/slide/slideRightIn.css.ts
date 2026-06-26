import { keyframes } from '@vanilla-extract/css'

export const slideRightIn = keyframes({
    from: { opacity: 0, transform: 'translateX(-6px) scale(0.97)' },
    to: { opacity: 1, transform: 'translateX(0) scale(1)' },
})
