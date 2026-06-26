import type { CSSProperties } from 'react'

export const headerStyle = (dark: boolean): CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 14,
    borderBottom: dark ? '1px solid #2d3748' : '1px solid #e2e8f0',
})

export const titleStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: dark ? '#f8fafc' : '#0f172a',
    letterSpacing: '-0.02em',
})

export const subtitleStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 13,
    color: dark ? '#64748b' : '#94a3b8',
    lineHeight: 1.5,
})

export const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 16,
}
