import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Groups related autocomplete items with a corresponding label.
 */
const AutocompleteGroup: FC<BaseAutocomplete.Group.Props> = (props) => (
    <BaseAutocomplete.Group {...props} />
)

AutocompleteGroup.displayName = 'Autocomplete.Group'

export default AutocompleteGroup
