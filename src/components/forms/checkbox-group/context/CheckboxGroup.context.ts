import { createContext, useContext } from 'react'

import type { CheckboxGroupProps } from '@components/forms/checkbox-group/types/CheckboxGroup.props.ts'

export type CheckboxGroupContextValue = {
    value: string[]
    allValues: string[]
    onValueChange: NonNullable<CheckboxGroupProps['onValueChange']>
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined)

export const CheckboxGroupProvider = CheckboxGroupContext.Provider

export const useCheckboxGroupContext = () => {
    const context = useContext(CheckboxGroupContext)

    if (!context) {
        throw new Error('CheckboxGroup.Header must be used inside CheckboxGroup.')
    }

    return context
}
