import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

/**
 * Collection wrapper for rendering autocomplete items from data.
 */
const AutocompleteCollection: FC<BaseAutocomplete.Collection.Props> = memo((props) => (
    <BaseAutocomplete.Collection {...props} />
))

AutocompleteCollection.displayName = 'Autocomplete.Collection'

export default AutocompleteCollection
