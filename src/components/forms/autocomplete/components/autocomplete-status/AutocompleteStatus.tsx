import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Status text for the autocomplete (e.g. loading / no results).
 */
const AutocompleteStatus: FC<BaseAutocomplete.Status.Props> = (props) => (
    <BaseAutocomplete.Status {...props} />
)

AutocompleteStatus.displayName = 'Autocomplete.Status'

export default AutocompleteStatus
