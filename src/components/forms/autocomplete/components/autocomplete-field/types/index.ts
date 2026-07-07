export type UseAutocompleteFieldParams = {
    error?: string
    value?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
}

export type UseAutocompleteFieldReturn = {
    inputId: string
    helperId: string
    hasError: boolean
    inputValue: string | undefined
    handleValueChange: (nextValue: string) => void
}
