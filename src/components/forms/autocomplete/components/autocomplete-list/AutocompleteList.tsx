import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Scrollable list of items inside the popup.
 */
const AutocompleteList: FC<BaseAutocomplete.List.Props> = (props) => (
    <BaseAutocomplete.List {...props} />
)

AutocompleteList.displayName = 'Autocomplete.List'

export default AutocompleteList
