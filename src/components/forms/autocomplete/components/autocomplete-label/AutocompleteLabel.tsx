import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

/**
 * Accessible label for an autocomplete group.
 *
 * Named `Label` to match the `Select.Label` compound API.
 */
const AutocompleteLabel: FC<BaseAutocomplete.GroupLabel.Props> = memo((props) => (
    <BaseAutocomplete.GroupLabel {...props} />
))

AutocompleteLabel.displayName = 'Autocomplete.Label'

export default AutocompleteLabel
