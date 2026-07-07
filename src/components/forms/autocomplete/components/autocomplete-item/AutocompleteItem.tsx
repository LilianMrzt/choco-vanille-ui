import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

import { cn } from '@utils/cn.ts'
import { AUTOCOMPLETE_ITEM_STYLES } from '@components/forms/autocomplete/components/autocomplete-item/styles/AutocompleteItem.css.ts'

/**
 * A single selectable option inside the autocomplete list.
 */
const AutocompleteItem: FC<BaseAutocomplete.Item.Props> = ({ className, children, ...props }) => (
    <BaseAutocomplete.Item
        className={cn(AUTOCOMPLETE_ITEM_STYLES.root, className)}
        {...props}
    >
        {children}
    </BaseAutocomplete.Item>
)

AutocompleteItem.displayName = 'Autocomplete.Item'

export default AutocompleteItem
