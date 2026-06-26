import type { CSSProperties } from 'react'

export const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
}

export const rowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '100px 80px 1fr 80px',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
}

export const nameStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 600,
    color: '#6366f1',
    margin: 0,
}

export const numericStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 13,
    fontWeight: 700,
    color: '#0f172a',
}

export const barStyle = (value: string): CSSProperties => {
    const num = Number(value)
    const max = 1400 // tooltip z-index is the highest
    return {
        height: 6,
        width: `${Math.min((num / max) * 100, 100)}%`,
        backgroundColor: '#818cf8',
        borderRadius: 3,
        minWidth: 4,
    }
}

export const emptyBarStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#cbd5e1',
}
