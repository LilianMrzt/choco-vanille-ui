import type { CSSProperties } from 'react'
import { darkColors, lightColors } from '@theme'

export const cardStyle = (dark: boolean): CSSProperties => ({
    backgroundColor: dark ? darkColors.surface.main : lightColors.surface.main,
    border: `1px solid ${dark ? darkColors.border.main : lightColors.border.main}`,
    borderRadius: 12,
    padding: '18px 20px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
})

export const titleStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 13,
    fontWeight: 600,
    color: dark ? darkColors.text.primary : lightColors.text.primary,
    letterSpacing: '-0.01em',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
})

export const descStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 11,
    color: dark ? darkColors.text.secondary : lightColors.text.secondary,
    lineHeight: 1.5,
})

export const swatchesGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 110px), 1fr))',
    gap: 10,
}
