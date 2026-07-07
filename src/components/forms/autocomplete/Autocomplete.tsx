import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import {
    AutocompleteInput,
    AutocompleteTrigger,
    AutocompleteInputGroup,
    AutocompleteIcon,
    AutocompleteClear,
    AutocompleteContent,
    AutocompleteList,
    AutocompleteGroup,
    AutocompleteLabel,
    AutocompleteItem,
    AutocompleteEmpty,
    AutocompleteSeparator,
    AutocompleteStatus,
    AutocompleteCollection,
} from '@components/forms/autocomplete/components'
import type { AutocompleteCompound } from '@components/forms/autocomplete/types/Autocomplete.types.ts'

// Re-export styles so consumers can target / extend them.
export { AUTOCOMPLETE_INPUT_STYLES } from '@components/forms/autocomplete/components/autocomplete-input/styles/AutocompleteInput.css.ts'
export { AUTOCOMPLETE_TRIGGER_STYLES } from '@components/forms/autocomplete/components/autocomplete-trigger/styles/AutocompleteTrigger.css.ts'
export { AUTOCOMPLETE_CONTENT_STYLES } from '@components/forms/autocomplete/components/autocomplete-content/styles/AutocompleteContent.css.ts'
export { AUTOCOMPLETE_ITEM_STYLES } from '@components/forms/autocomplete/components/autocomplete-item/styles/AutocompleteItem.css.ts'
export { AUTOCOMPLETE_SEPARATOR_STYLES } from '@components/forms/autocomplete/components/autocomplete-separator/styles/AutocompleteSeparator.css.ts'

/**
 * A styled autocomplete control built on top of `@base-ui/react/autocomplete`.
 *
 * Exposes the full Base UI Autocomplete API as compound subcomponents, all
 * styled to match the library's design tokens. The input looks and behaves like
 * a TextField, and the listbox popup follows the same visual language as the
 * Select and DropdownMenu components.
 *
 * For a simpler, field-style API (label, helperText, error, options array),
 * use `AutocompleteField`.
 *
 * @example
 * ```tsx
 * <Autocomplete>
 *   <Autocomplete.Input placeholder="Search a fruit" />
 *   <Autocomplete.Content>
 *     <Autocomplete.List>
 *       <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
 *       <Autocomplete.Item value="banana">Banana</Autocomplete.Item>
 *     </Autocomplete.List>
 *   </Autocomplete.Content>
 * </Autocomplete>
 * ```
 */
const Autocomplete = ((props) => (
    // Match Select's behavior of opening the popup on click, while still
    // letting consumers opt out via an explicit `openOnInputClick` prop.
    <BaseAutocomplete.Root
        openOnInputClick
        {...props}
    />
)) as AutocompleteCompound

Autocomplete.displayName = 'Autocomplete'

Autocomplete.Input = AutocompleteInput
Autocomplete.Trigger = AutocompleteTrigger
Autocomplete.InputGroup = AutocompleteInputGroup
Autocomplete.Icon = AutocompleteIcon
Autocomplete.Clear = AutocompleteClear
Autocomplete.Content = AutocompleteContent
Autocomplete.List = AutocompleteList
Autocomplete.Group = AutocompleteGroup
Autocomplete.Label = AutocompleteLabel
Autocomplete.Item = AutocompleteItem
Autocomplete.Empty = AutocompleteEmpty
Autocomplete.Separator = AutocompleteSeparator
Autocomplete.Status = AutocompleteStatus
Autocomplete.Collection = AutocompleteCollection

export default Autocomplete
