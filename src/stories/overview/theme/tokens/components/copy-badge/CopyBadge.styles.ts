import type { CSSProperties } from 'react'

export const badgeStyle = (copied: boolean): CSSProperties => ({
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 10,
    fontFamily: 'monospace',
    padding: '2px 6px',
    borderRadius: 4,
    backgroundColor: copied ? '#22c55e22' : 'transparent',
    color: copied ? '#16a34a' : '#94a3b8',
    border: copied ? '1px solid #22c55e44' : '1px solid transparent',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    flexShrink: 0,
})
