import type { CSSProperties } from 'react'

export const sectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
}

export const headerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 14,
    borderBottom: '1px solid #e2e8f0',
}

export const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: 22,
    fontWeight: 700,
    color: '#0f172a',
    letterSpacing: '-0.02em',
}

export const subtitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 1.5,
}
