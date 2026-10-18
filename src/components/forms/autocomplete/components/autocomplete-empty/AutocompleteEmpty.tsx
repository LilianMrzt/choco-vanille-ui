import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

import { AUTOCOMPLETE_EMPTY_STYLES } from '@components/forms/autocomplete/components/autocomplete-empty/styles/AutocompleteEmpty.css.ts'

/**
 * Renders its children when the filtered autocomplete list is empty.
 */
const AutocompleteEmpty: FC<BaseAutocomplete.Empty.Props> = memo(({ className, ...props }) => (
    <BaseAutocomplete.Empty
        className={className ? `${AUTOCOMPLETE_EMPTY_STYLES.root} ${className}` : AUTOCOMPLETE_EMPTY_STYLES.root}
        {...props}
    />
))

AutocompleteEmpty.displayName = 'Autocomplete.Empty'

export default AutocompleteEmpty
