export type UseSelectFieldParams = {
    error?: string
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
}

export type UseSelectFieldReturn = {
    triggerId: string
    helperId: string
    hasError: boolean
    selectedValue: string | undefined
    handleValueChange: (nextValue: string) => void
}
