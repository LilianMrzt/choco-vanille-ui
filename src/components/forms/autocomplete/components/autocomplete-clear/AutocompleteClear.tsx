import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

/**
 * Clears the autocomplete input value when clicked.
 */
const AutocompleteClear: FC<BaseAutocomplete.Clear.Props> = memo((props) => (
    <BaseAutocomplete.Clear {...props} />
))

AutocompleteClear.displayName = 'Autocomplete.Clear'

export default AutocompleteClear
