import type { CSSProperties } from 'react'

export const variantsWrapperStyle: CSSProperties = {
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

export const boxShadowPreviewStyle = (shadow: string): CSSProperties => ({
    width: '100%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    boxShadow: shadow,
})

export const dropShadowWrapperStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: 8,
}

export const dropShadowPreviewStyle = (shadow: string): CSSProperties => ({
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#818cf8',
    filter: shadow,
})
