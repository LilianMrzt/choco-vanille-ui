import { useContext } from 'react'

import { CheckboxGroupContext } from '@components/forms/checkbox-group/context/CheckboxGroup.context.ts'
import type { CheckboxRootProps } from '@components/forms/checkbox/types'
import { useCheckboxRegistration } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/hooks/useCheckboxRegistration.hook.ts'
import { resolveParentCheckbox } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/utils/resolveParentCheckbox.utils.ts'

/**
 * Connects a checkbox root to optional group registration and parent behavior.
 * @param props - Checkbox identity, selection, callback and visible-element ref.
 * @returns The composed ref, checked state, callback and controlled element IDs.
 * @throws {Error} If a parent checkbox has no group or the group has no allValues.
 * @example
 * const behavior = useCheckboxRoot({ value: 'email' })
 */
export const useCheckboxRoot = (
    props: Pick<CheckboxRootProps, 'value' | 'name' | 'disabled' | 'parent' | 'ref' | 'checked' | 'indeterminate' | 'onCheckedChange' | 'aria-controls'>,
): Pick<CheckboxRootProps, 'ref' | 'checked' | 'indeterminate' | 'onCheckedChange' | 'aria-controls'> => {
    const group = useContext(CheckboxGroupContext)
    const ref = useCheckboxRegistration(props, group)
    const parentState = resolveParentCheckbox(props, group)

    return { ...parentState, ref }
}
