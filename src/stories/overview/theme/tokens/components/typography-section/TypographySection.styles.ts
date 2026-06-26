import type { CSSProperties } from 'react'

export const groupsWrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
}

export const groupStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
}

export const groupTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#475569',
}

export const groupSubtitleStyle: CSSProperties = {
    margin: '2px 0 0',
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 1.5,
}

export const previewTextStyle = (extra: CSSProperties): CSSProperties => ({
    fontSize: 15,
    color: '#1e293b',
    margin: 0,
    lineHeight: 1.3,
    ...extra,
})
