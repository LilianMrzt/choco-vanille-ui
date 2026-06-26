import type { CSSProperties } from 'react'

export const previewStyle = (value: string): CSSProperties => ({
    width: 56,
    height: 56,
    backgroundColor: '#e0e7ff',
    border: '2px solid #6366f1',
    borderRadius: value,
    flexShrink: 0,
})
