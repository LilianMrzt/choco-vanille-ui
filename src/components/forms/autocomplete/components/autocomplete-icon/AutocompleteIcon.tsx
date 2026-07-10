import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

/**
 * Icon slot rendered inside the autocomplete input group.
 */
const AutocompleteIcon: FC<BaseAutocomplete.Icon.Props> = memo((props) => (
    <BaseAutocomplete.Icon {...props} />
))

AutocompleteIcon.displayName = 'Autocomplete.Icon'

export default AutocompleteIcon
