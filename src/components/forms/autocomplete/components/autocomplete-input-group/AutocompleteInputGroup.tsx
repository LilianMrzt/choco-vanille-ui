import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Wrapper for the autocomplete input and its associated controls (trigger, clear).
 */
const AutocompleteInputGroup: FC<BaseAutocomplete.InputGroup.Props> = (props) => (
    <BaseAutocomplete.InputGroup {...props} />
)

AutocompleteInputGroup.displayName = 'Autocomplete.InputGroup'

export default AutocompleteInputGroup
