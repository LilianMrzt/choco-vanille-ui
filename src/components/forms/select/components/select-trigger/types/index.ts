import { type CSSProperties, type MouseEventHandler } from 'react'

export type UseSelectTriggerParams = {
    width?: CSSProperties['width']
    style?: CSSProperties
    onMouseDown?: MouseEventHandler<HTMLButtonElement>
}

export type UseSelectTriggerReturn = {
    handleMouseDown: MouseEventHandler<HTMLButtonElement>
    handleFocus: (event: React.FocusEvent<HTMLButtonElement>) => void
    handleBlur: (event: React.FocusEvent<HTMLButtonElement>) => void
    mergedStyle: CSSProperties | undefined
}
