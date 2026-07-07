import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

/**
 * The autocomplete popup container.
 */
const AutocompletePopup: FC<BaseAutocomplete.Popup.Props> = (props) => (
    <BaseAutocomplete.Popup {...props} />
)

AutocompletePopup.displayName = 'Autocomplete.Popup'

export default AutocompletePopup
