import type { CSSProperties } from 'react'

export const cardStyle = (dark: boolean): CSSProperties => ({
    backgroundColor: dark ? '#1e2530' : '#ffffff',
    border: dark ? '1px solid #2d3748' : '1px solid #e5e7eb',
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
    color: dark ? '#f1f5f9' : '#0f172a',
    letterSpacing: '-0.01em',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
})

export const descStyle = (dark: boolean): CSSProperties => ({
    margin: 0,
    fontSize: 11,
    color: dark ? '#64748b' : '#94a3b8',
    lineHeight: 1.5,
})

export const swatchesGrid: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
}
