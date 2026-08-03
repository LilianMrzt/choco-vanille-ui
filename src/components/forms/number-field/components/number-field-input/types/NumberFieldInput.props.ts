import type { InputHTMLAttributes, Ref } from 'react'

import type { NumberFieldSize } from '@components/forms/number-field/types/NumberField.types.ts'

export type NumberFieldInputProps = {
    inputProps: Omit<
        InputHTMLAttributes<HTMLInputElement>,
        'className' | 'defaultValue' | 'type' | 'value'
    >
    inputRef?: Ref<HTMLInputElement>
    className?: string
    describedBy?: string
    hasError: boolean
    size: NumberFieldSize
}
