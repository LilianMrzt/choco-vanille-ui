import type { CSSProperties } from 'react'
import { darkColors, lightColors } from '@theme'

export const cardStyle = (dark: boolean): CSSProperties => ({
    backgroundColor: dark ? darkColors.surface : lightColors.surface,
    border: `1px solid ${dark ? darkColors.border : lightColors.border}`,
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
    color: dark ? darkColors.foreground : lightColors.foreground,
    letterSpacing: '-0.01em',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
})

export const descStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 11,
    color: dark ? darkColors.foregroundMuted : lightColors.foregroundMuted,
    lineHeight: 1.5,
})

export const swatchesGrid: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
}
