import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

/**
 * Wrapper for the autocomplete input and its associated controls (trigger, clear).
 */
const AutocompleteInputGroup: FC<BaseAutocomplete.InputGroup.Props> = memo((props) => (
    <BaseAutocomplete.InputGroup {...props} />
))

AutocompleteInputGroup.displayName = 'Autocomplete.InputGroup'

export default AutocompleteInputGroup
