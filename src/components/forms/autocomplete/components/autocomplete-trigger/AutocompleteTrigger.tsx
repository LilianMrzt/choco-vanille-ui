import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { IconRegistry } from '@constants/icons'
import { cn } from '@utils/cn.ts'
import { AUTOCOMPLETE_TRIGGER_STYLES } from '@components/forms/autocomplete/components/autocomplete-trigger/styles/AutocompleteTrigger.css.ts'
import type { AutocompleteTriggerProps } from '@components/forms/autocomplete/components/autocomplete-trigger/types/AutocompleteTrigger.props.ts'

/**
 * A button that opens the autocomplete popup.
 *
 * Renders as a chevron icon inside the input group. Can be used alongside
 * `Autocomplete.Input` when you want a select-like open action.
 */
const AutocompleteTrigger: FC<AutocompleteTriggerProps> = memo(({
    className,
    'aria-label': ariaLabel = 'Open options',
    ...props
}) => (
    <BaseAutocomplete.Trigger
        className={cn(AUTOCOMPLETE_TRIGGER_STYLES.root, className)}
        aria-label={ariaLabel}
        {...props}
    >
        <Icon
            icon={IconRegistry.chevronDown}
            size={'md'}
        />
    </BaseAutocomplete.Trigger>
))

AutocompleteTrigger.displayName = 'Autocomplete.Trigger'

export default AutocompleteTrigger
