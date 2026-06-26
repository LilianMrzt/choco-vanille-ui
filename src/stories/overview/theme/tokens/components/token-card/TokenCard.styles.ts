import type { CSSProperties } from 'react'

export const cardStyle: CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: '14px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
}

export const nameStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: 600,
    color: '#6366f1',
    margin: 0,
}

export const valueRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

export const valueStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#94a3b8',
    margin: 0,
    maxWidth: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
}

export const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 12,
}
