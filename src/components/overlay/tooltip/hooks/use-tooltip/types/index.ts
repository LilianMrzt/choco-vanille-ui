export type UseTooltipOptions = {
    disabled: boolean
    open?: boolean
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
}

export type UseTooltipReturn = {
    effectiveOpen: boolean
    handleOpenChange: (isOpen: boolean) => void
}
