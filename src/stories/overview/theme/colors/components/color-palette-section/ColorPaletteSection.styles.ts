import type { CSSProperties } from 'react'
import { darkColors, lightColors } from '@theme'

export const sectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
}

export const headerStyle = (dark: boolean): CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 14,
    borderBottom: `1px solid ${dark ? darkColors.border.main : lightColors.border.main}`,
})

export const titleStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: dark ? darkColors.text.primary : lightColors.text.primary,
    letterSpacing: '-0.02em',
})

export const subtitleStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 13,
    color: dark ? darkColors.text.secondary : lightColors.text.secondary,
    lineHeight: 1.5,
})

export const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
    gap: 16,
}
