export type UseTextFieldReturn = {
    inputId: string | undefined
    helperId: string
    hasError: boolean
    isPassword: boolean
    showPassword: boolean
    setShowPassword: (value: boolean) => void
    handleMouseDown: (e: React.MouseEvent<HTMLInputElement>) => void
    handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
    hasStartIcon: boolean
    hasEndAction: boolean
    resolvedType: string | undefined
}
