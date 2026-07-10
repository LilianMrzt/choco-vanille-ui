import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

/**
 * Scrollable list of items inside the popup.
 */
const AutocompleteList: FC<BaseAutocomplete.List.Props> = memo((props) => (
    <BaseAutocomplete.List {...props} />
))

AutocompleteList.displayName = 'Autocomplete.List'

export default AutocompleteList
