import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Renders its children when the filtered autocomplete list is empty.
 */
const AutocompleteEmpty: FC<BaseAutocomplete.Empty.Props> = (props) => (
    <BaseAutocomplete.Empty {...props} />
)

AutocompleteEmpty.displayName = 'Autocomplete.Empty'

export default AutocompleteEmpty
