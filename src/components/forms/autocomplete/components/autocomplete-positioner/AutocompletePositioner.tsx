import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Positions the autocomplete popup against the input group.
 */
const AutocompletePositioner: FC<BaseAutocomplete.Positioner.Props> = (props) => (
    <BaseAutocomplete.Positioner {...props} />
)

AutocompletePositioner.displayName = 'Autocomplete.Positioner'

export default AutocompletePositioner
