import { keyframes } from '@vanilla-extract/css'

export const pulseAnimation = keyframes({
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
})
