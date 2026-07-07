import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Portal wrapper for the autocomplete popup.
 */
const AutocompletePortal: FC<BaseAutocomplete.Portal.Props> = (props) => (
    <BaseAutocomplete.Portal {...props} />
)

AutocompletePortal.displayName = 'Autocomplete.Portal'

export default AutocompletePortal
