import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * Backdrop for the autocomplete popup.
 */
const AutocompleteBackdrop: FC<BaseAutocomplete.Backdrop.Props> = (props) => (
    <BaseAutocomplete.Backdrop {...props} />
)

AutocompleteBackdrop.displayName = 'Autocomplete.Backdrop'

export default AutocompleteBackdrop
