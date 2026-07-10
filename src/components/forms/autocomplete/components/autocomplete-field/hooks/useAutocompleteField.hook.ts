import { useCallback, useId, useState } from 'react'

import type {
    UseAutocompleteFieldParams,
    UseAutocompleteFieldReturn,
} from '@components/forms/autocomplete/components/autocomplete-field/types'

const useAutocompleteField = ({
    error,
    value,
    defaultValue,
    onValueChange,
}: UseAutocompleteFieldParams): UseAutocompleteFieldReturn => {
    const generatedId = useId()
    const inputId = `${generatedId}-input`
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)

    const [internalValue, setInternalValue] = useState<string | undefined>(
        defaultValue ?? (value !== undefined ? String(value) : undefined),
    )

    const isControlled = value !== undefined
    const inputValue = isControlled ? String(value) : internalValue

    const handleValueChange = useCallback(
        (nextValue: string) => {
            if (!isControlled) {
                setInternalValue(nextValue)
            }
            onValueChange?.(nextValue)
        },
        [isControlled, onValueChange],
    )

    return {
        inputId,
        helperId,
        hasError,
        inputValue,
        handleValueChange,
    }
}

export default useAutocompleteField
