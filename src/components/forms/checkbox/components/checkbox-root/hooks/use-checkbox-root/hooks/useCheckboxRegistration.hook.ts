import { useEffect, useId, useRef, type RefCallback } from 'react'

import type { CheckboxGroupContextValue } from '@components/forms/checkbox-group/types'
import type { CheckboxRootProps } from '@components/forms/checkbox/types'

/**
 * Registers a mounted group item and forwards its visible element ref.
 * Registration is removed when the item changes or unmounts.
 * @param props - Item identity, disabled state, parent flag and consumer ref.
 * @param props.value - Group value.
 * @param props.name - Form name used when value is omitted.
 * @param props.disabled - Whether the item is disabled.
 * @param props.parent - Excludes parent checkboxes from item registrations.
 * @param props.ref - Consumer ref to the visible element.
 * @param group - Containing group, or null outside a group.
 * @returns A callback ref to attach to the checkbox root.
 * @example
 * const ref = useCheckboxRegistration({ value: 'a' }, group)
 */
export const useCheckboxRegistration = (
    { value, name, disabled, parent, ref }: Pick<CheckboxRootProps, 'value' | 'name' | 'disabled' | 'parent' | 'ref'>,
    group: CheckboxGroupContextValue | null,
): RefCallback<HTMLElement> => {
    const register = group?.register
    const registrationId = useId()
    const elementRef = useRef<HTMLElement | null>(null)
    const itemValue = value ?? name
    const hasAllValues = group?.allValues !== undefined

    useEffect(() => {
        if (!register || !hasAllValues || parent || itemValue === undefined || !elementRef.current) {
            return undefined
        }
        return register(registrationId, {
            id: elementRef.current.id,
            value: itemValue,
            disabled: Boolean(disabled),
        })
    }, [register, registrationId, itemValue, disabled, parent, hasAllValues])

    return (element) => {
        elementRef.current = element
        if (typeof ref === 'function') {
            return ref(element)
        }
        if (ref) {
            ref.current = element
        }
        return undefined
    }
}
