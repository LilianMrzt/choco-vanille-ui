import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Accessible label for an autocomplete group.
 */
const AutocompleteGroupLabel: FC<BaseAutocomplete.GroupLabel.Props> = (props) => (
    <BaseAutocomplete.GroupLabel {...props} />
)

AutocompleteGroupLabel.displayName = 'Autocomplete.GroupLabel'

export default AutocompleteGroupLabel
