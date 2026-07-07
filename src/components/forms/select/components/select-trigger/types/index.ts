import { type CSSProperties, type FocusEventHandler, type MouseEventHandler } from 'react'

export type UseSelectTriggerParams = {
    width?: CSSProperties['width']
    style?: CSSProperties
    onMouseDown?: MouseEventHandler<HTMLButtonElement>
    onFocus?: FocusEventHandler<HTMLButtonElement>
    onBlur?: FocusEventHandler<HTMLButtonElement>
}

export type UseSelectTriggerReturn = {
    handleMouseDown: MouseEventHandler<HTMLButtonElement>
    handleFocus: FocusEventHandler<HTMLButtonElement>
    handleBlur: FocusEventHandler<HTMLButtonElement>
    mergedStyle: CSSProperties | undefined
}
