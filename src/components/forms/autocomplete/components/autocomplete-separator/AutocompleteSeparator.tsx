import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import type { FC } from 'react'

import { cn } from '@utils/cn.ts'
import { AUTOCOMPLETE_SEPARATOR_STYLES } from '@components/forms/autocomplete/components/autocomplete-separator/AutocompleteSeparator.css.ts'

/**
 * Horizontal divider between autocomplete groups.
 */
const AutocompleteSeparator: FC<BaseAutocomplete.Separator.Props> = ({ className, ...props }) => (
    <BaseAutocomplete.Separator
        className={cn(AUTOCOMPLETE_SEPARATOR_STYLES.root, className)}
        {...props}
    />
)

AutocompleteSeparator.displayName = 'Autocomplete.Separator'

export default AutocompleteSeparator
