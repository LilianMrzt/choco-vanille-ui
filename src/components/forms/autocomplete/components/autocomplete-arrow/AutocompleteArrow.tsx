import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Arrow element pointing to the autocomplete input group.
 */
const AutocompleteArrow: FC<BaseAutocomplete.Arrow.Props> = (props) => (
    <BaseAutocomplete.Arrow {...props} />
)

AutocompleteArrow.displayName = 'Autocomplete.Arrow'

export default AutocompleteArrow
