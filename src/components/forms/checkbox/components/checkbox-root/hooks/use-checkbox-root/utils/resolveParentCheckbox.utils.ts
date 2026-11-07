import type { CheckboxGroupContextValue } from '@components/forms/checkbox-group/types'
import type { CheckboxRootProps } from '@components/forms/checkbox/types'
import { getParentCheckboxState } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/utils/getParentCheckboxState.utils.ts'
import { getParentCheckboxValues } from '@components/forms/checkbox/components/checkbox-root/hooks/use-checkbox-root/utils/getParentCheckboxValues.utils.ts'

/**
 * Coordinates a parent checkbox with its group and preserves consumer callbacks.
 * Cancellation prevents the group update. Regular checkboxes retain their props.
 * @param props - Parent flag, checked state, callback and additional aria-controls element IDs.
 * @param props.parent - Whether this checkbox controls the group.
 * @param props.checked - Controlled state of a regular checkbox.
 * @param props.indeterminate - Mixed state of a regular checkbox.
 * @param props.onCheckedChange - Consumer callback and cancellable event details.
 * @param group - Containing group, or null outside a group.
 * @returns Checkbox state, change callback and controlled element IDs.
 * @throws {Error} If a parent checkbox has no group or the group has no allValues.
 * @example
 * const state = resolveParentCheckbox({ parent: true }, group)
 */
export const resolveParentCheckbox = (
    props: Pick<CheckboxRootProps, 'parent' | 'checked' | 'indeterminate' | 'onCheckedChange' | 'aria-controls'>,
    group: CheckboxGroupContextValue | null,
): Pick<CheckboxRootProps, 'checked' | 'indeterminate' | 'onCheckedChange' | 'aria-controls'> => {
    const { parent, checked, indeterminate, onCheckedChange, 'aria-controls': ariaControls } = props

    if (parent && !group) {
        throw new Error('A parent checkbox must be used inside CheckboxGroup.')
    }
    if (parent && group?.allValues === undefined) {
        throw new Error('A parent checkbox requires allValues on CheckboxGroup.')
    }

    const allValues = group?.allValues
    const selected = group?.value
    const parentState = parent && allValues && selected
        ? getParentCheckboxState(allValues, selected)
        : { checked: false, indeterminate: false }
    const registered = parent && group && allValues
        ? [...group.registrations.values()].filter((item) => allValues.includes(item.value))
        : []
    const controls = [ariaControls, ...registered.map((item) => item.id)].filter(Boolean).join(' ') || undefined

    /**
     * Invokes the consumer and applies an uncancelled parent change.
     * @param nextChecked - Proposed checked state.
     * @param details - Cancellable change details.
     * @returns Nothing.
     * @example
     * handleCheckedChange(true, details)
     */
    const handleCheckedChange: NonNullable<CheckboxRootProps['onCheckedChange']> = (nextChecked, details) => {
        onCheckedChange?.(nextChecked, details)
        if (!parent || !group || !allValues || details.isCanceled) {
            return
        }
        group.onValueChange(getParentCheckboxValues(allValues, group.value, registered, nextChecked), details)
    }

    return {
        checked: parent ? parentState.checked : checked,
        indeterminate: parent ? parentState.indeterminate : indeterminate,
        onCheckedChange: handleCheckedChange,
        'aria-controls': controls,
    }
}
