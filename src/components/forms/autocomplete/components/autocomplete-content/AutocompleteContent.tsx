import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { memo, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { AUTOCOMPLETE_CONTENT_STYLES } from '@components/forms/autocomplete/components/autocomplete-content/styles/AutocompleteContent.css.ts'
import { AutocompleteListAriaLabelContext } from '@components/forms/autocomplete/components/autocomplete-content/AutocompleteContent.context.ts'
import { useViewportShift } from '@hooks'
import type { AutocompleteContentProps } from '@components/forms/autocomplete/components/autocomplete-content/types/AutocompleteContent.props.ts'

/**
 * The autocomplete popup panel.
 *
 * Wraps Base UI's Portal → Positioner → Popup so consumers can use the same
 * simple API as Select.Content. Collision handling is delegated to
 * `useViewportShift` (Base UI's built-in flip/shift is disabled).
 */
const AutocompleteContent: FC<AutocompleteContentProps> = memo(({
    className,
    listboxAriaLabel = 'Options',
    children,
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    collisionPadding = 8,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <BaseAutocomplete.Portal>
            <BaseAutocomplete.Positioner
                side={side}
                align={align}
                sideOffset={sideOffset}
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none' }}
                {...props}
            >
                <BaseAutocomplete.Popup
                    ref={contentRef}
                    className={cn(AUTOCOMPLETE_CONTENT_STYLES.root, className)}
                >
                    <AutocompleteListAriaLabelContext.Provider value={listboxAriaLabel}>
                        {children}
                    </AutocompleteListAriaLabelContext.Provider>
                </BaseAutocomplete.Popup>
            </BaseAutocomplete.Positioner>
        </BaseAutocomplete.Portal>
    )
})

AutocompleteContent.displayName = 'Autocomplete.Content'

export default AutocompleteContent
