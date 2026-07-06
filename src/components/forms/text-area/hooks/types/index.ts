export type UseTextAreaReturn = {
    inputId: string | undefined
    helperId: string
    hasError: boolean
    handleMouseDown: (e: React.MouseEvent<HTMLTextAreaElement>) => void
    handleFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    handleBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => void
    hasStartIcon: boolean
    hasEndAction: boolean
}

export type UseAutoResizeTextAreaOptions = {
    minRows?: number
    maxRows?: number
}
