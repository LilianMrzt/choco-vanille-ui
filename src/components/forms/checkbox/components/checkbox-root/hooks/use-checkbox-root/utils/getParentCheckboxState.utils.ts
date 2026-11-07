/**
 * Resolves the checked and mixed state of a parent checkbox.
 * An empty scope is unchecked, and values outside the scope do not affect it.
 * @param allValues - Values controlled by the parent.
 * @param selected - Current group selection.
 * @returns The parent checkbox state.
 * @example
 * getParentCheckboxState(['a', 'b'], ['a']) // { checked: false, indeterminate: true }
 */
export const getParentCheckboxState = (
    allValues: readonly string[],
    selected: readonly string[],
): Readonly<{ checked: boolean; indeterminate: boolean }> => {
    const checked = allValues.length > 0 && allValues.every((item) => selected.includes(item))
    const indeterminate = !checked && allValues.some((item) => selected.includes(item))

    return { checked, indeterminate }
}
