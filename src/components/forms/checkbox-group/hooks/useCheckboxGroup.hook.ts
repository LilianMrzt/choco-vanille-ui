import { useCallback, useState } from 'react'

import type { CheckboxGroupContextValue, CheckboxGroupProps, CheckboxGroupRegistration } from '@components/forms/checkbox-group/types'

/**
 * Coordinates group selection and mounted checkbox registrations.
 * The controlled value takes precedence; uncontrolled selection starts from
 * defaultValue and changes are ignored when event details are cancelled.
 * @param options - Selection props and values controlled by the parent checkbox.
 * @param options.allValues - Values controlled by the parent checkbox.
 * @param options.value - Controlled selection, when supplied.
 * @param options.defaultValue - Initial uncontrolled selection; defaults to empty.
 * @param options.onValueChange - Receives selection and cancellable event details.
 * @returns Group context shared with checkbox roots.
 * @example
 * const group = useCheckboxGroup({ allValues: ['a'], defaultValue: [] })
 */
export const useCheckboxGroup = ({
    allValues,
    value,
    defaultValue,
    onValueChange,
}: Pick<CheckboxGroupProps, 'allValues' | 'value' | 'defaultValue' | 'onValueChange'>): CheckboxGroupContextValue => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? [])
    const [registrations, setRegistrations] = useState<ReadonlyMap<string, CheckboxGroupRegistration>>(() => new Map())
    const currentValue = value ?? internalValue

    /**
     * Adds one mounted checkbox and returns its cleanup.
     * @param key - Stable registration key.
     * @param registration - Current item identity and disabled state.
     * @returns A cleanup function removing the registration.
     * @example
     * const unregister = register('item', { id: 'a', value: 'a', disabled: false })
     */
    const register = useCallback((key: string, registration: CheckboxGroupRegistration) => {
        setRegistrations((previous) => new Map(previous).set(key, registration))
        return () => {
            setRegistrations((previous) => {
                const next = new Map(previous)
                next.delete(key)
                return next
            })
        }
    }, [])

    /**
     * Notifies the consumer before applying an uncancelled uncontrolled change.
     * @param nextValue - Proposed selected values.
     * @param details - Cancellable change details.
     * @returns Nothing.
     * @example
     * handleValueChange(['a'], details)
     */
    const handleValueChange: CheckboxGroupContextValue['onValueChange'] = (nextValue, details) => {
        onValueChange?.(nextValue, details)
        if (!details.isCanceled && value === undefined) {
            setInternalValue(nextValue)
        }
    }

    return { allValues, value: currentValue, registrations, register, onValueChange: handleValueChange }
}
