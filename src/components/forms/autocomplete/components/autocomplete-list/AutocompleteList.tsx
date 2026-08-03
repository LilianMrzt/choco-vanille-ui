import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC, useContext } from 'react'

import { AutocompleteListAriaLabelContext } from '@components/forms/autocomplete/components/autocomplete-content/AutocompleteContent.context.ts'

/**
 * Scrollable list of items inside the popup.
 */
const AutocompleteList: FC<BaseAutocomplete.List.Props> = memo(({
    'aria-label': ariaLabel,
    ...props
}) => {
    const contentAriaLabel = useContext(AutocompleteListAriaLabelContext)

    return (
        <BaseAutocomplete.List
            aria-label={ariaLabel ?? contentAriaLabel}
            {...props}
        />
    )
})

AutocompleteList.displayName = 'Autocomplete.List'

export default AutocompleteList
