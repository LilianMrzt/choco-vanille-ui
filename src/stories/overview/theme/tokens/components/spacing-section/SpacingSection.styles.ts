import type { CSSProperties } from 'react'

export const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
}

export const rowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '64px 1fr 100px 80px',
    alignItems: 'center',
    gap: 12,
    padding: '8px 12px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
}

export const nameStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 600,
    color: '#6366f1',
    margin: 0,
}

export const valueCellStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
}

export const remValueStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 500,
    color: '#374151',
    margin: 0,
}

export const pxValueStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#9ca3af',
    margin: 0,
}

export const barStyle = (value: string): CSSProperties => ({
    height: 20,
    width: value,
    maxWidth: '100%',
    backgroundColor: '#818cf8',
    borderRadius: 3,
    flexShrink: 0,
})

export const emptyBarStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#cbd5e1',
}
