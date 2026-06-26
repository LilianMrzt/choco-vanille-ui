import type { CSSProperties } from 'react'

export const contentStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
}

export const subGroupStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
}

export const subGroupTitleStyle: CSSProperties = {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    color: '#475569',
}

export const durationListStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
}

export const durationRowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '80px 64px 1fr 80px',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
}

export const durationNameStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 600,
    color: '#6366f1',
    margin: 0,
}

export const durationValueStyle: CSSProperties = {
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: 600,
    color: '#0f172a',
}

export const durationBarStyle = (value: string): CSSProperties => {
    const ms = parseInt(value)
    const maxMs = 500
    return {
        height: 6,
        width: `${ms === 0 ? 1 : (ms / maxMs) * 100}%`,
        backgroundColor: '#818cf8',
        borderRadius: 3,
        minWidth: 4,
        maxWidth: '100%',
    }
}

export const easingDotStyle = (active: boolean, easingValue: string): CSSProperties => ({
    position: 'absolute',
    top: '50%',
    left: active ? 'calc(100% - 18px)' : '6px',
    transform: 'translateY(-50%)',
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    transition: active ? `left 600ms ${easingValue}` : 'none',
})

export const easingTrackStyle: CSSProperties = {
    height: 40,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: '#f1f5f9',
}
