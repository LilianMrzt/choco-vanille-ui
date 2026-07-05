import { useId, useState } from 'react'
import type { UseSelectFieldParams, UseSelectFieldReturn } from '@components/forms/select/components/select-field/types'

const useSelectField = ({
    error,
    value,
    defaultValue,
    onValueChange,
}: UseSelectFieldParams): UseSelectFieldReturn => {
    const generatedId = useId()
    const triggerId = `${generatedId}-trigger`
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)

    const [internalValue, setInternalValue] = useState<string | undefined>(
        defaultValue ?? (value !== undefined ? String(value) : undefined),
    )

    const isControlled = value !== undefined
    const selectedValue = isControlled ? String(value) : internalValue

    const handleValueChange = (nextValue: string) => {
        if (!isControlled) {
            setInternalValue(nextValue)
        }
        onValueChange?.(nextValue)
    }

    return {
        triggerId,
        helperId,
        hasError,
        selectedValue,
        handleValueChange,
    }
}

export default useSelectField
