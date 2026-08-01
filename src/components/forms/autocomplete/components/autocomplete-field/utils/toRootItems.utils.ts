import type { AutocompleteOption } from '@components'

type FlatRootItem = { value: string; label: string; disabled?: boolean }
type GroupedRootItem = { label: string; items: FlatRootItem[] }

/**
 * Converts `AutocompleteField`'s `options` into the `items` shape expected by
 * Base UI's `Autocomplete.Root`, which drives its built-in filtering.
 *
 * - Flat options become a flat array of `{ value, label, disabled }`.
 * - Grouped options become an array of `{ label, items }` groups, matching
 *   Base UI's grouped `items` format. Separators are UI-only and are not part
 *   of the filtered data set.
 */
export const toRootItems = (
    options: AutocompleteOption[],
): (FlatRootItem | GroupedRootItem)[] => {
    const hasGroups = options.some((option) => option.type === 'group')

    if (!hasGroups) {
        return options
            .filter((option): option is Extract<AutocompleteOption, { type?: undefined }> => option.type === undefined)
            .map(({ value, label, disabled }) => ({ value, label, disabled }))
    }

    return options
        .filter((option): option is Extract<AutocompleteOption, { type: 'group' }> => option.type === 'group')
        .map((group) => ({
            label: group.label,
            items: group.options.map(({ value, label, disabled }) => ({ value, label, disabled })),
        }))
}
