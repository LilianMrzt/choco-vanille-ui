import type { CheckboxGroupRegistration } from '@components/forms/checkbox-group/types'

/**
 * Calculates a parent selection while retaining disabled and out-of-scope values.
 * @param allValues - Values controlled by the parent.
 * @param selected - Current group selection.
 * @param registrations - Mounted checkboxes within the parent scope.
 * @param nextChecked - Whether to select or clear enabled values.
 * @returns The next group selection in scope order followed by other values.
 * @example
 * getParentCheckboxValues(['a'], [], [], true) // ['a']
 */
export const getParentCheckboxValues = (
    allValues: readonly string[],
    selected: readonly string[],
    registrations: readonly CheckboxGroupRegistration[],
    nextChecked: boolean,
): string[] => {
    const disabledValues = new Set(registrations.filter((item) => item.disabled).map((item) => item.value))
    const nextValues = allValues.filter((item) => disabledValues.has(item) ? selected.includes(item) : nextChecked)

    return [...nextValues, ...selected.filter((item) => !allValues.includes(item))]
}
