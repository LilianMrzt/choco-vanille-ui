import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'
import { type FC, memo, useCallback, useRef } from 'react'

import { TextFieldStartIcon } from '@components/forms/text-field/components'
import { AUTOCOMPLETE_INPUT_STYLES } from '@components/forms/autocomplete/components/autocomplete-input/styles/AutocompleteInput.css.ts'
import { cn } from '@utils/cn.ts'
import type { AutocompleteInputProps } from '@components/forms/autocomplete/components/autocomplete-input/types/AutocompleteInput.props.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * The text input that filters the autocomplete list.
 *
 * Looks exactly like a TextField input: same height, padding, border, focus
 * ring and disabled state. Supports `size`, `startIcon`, `placeholder`,
 * `hasError` and `width`.
 */
const AutocompleteInput: FC<AutocompleteInputProps> = memo(({
    className,
    placeholder,
    startIcon,
    size = 'md',
    fontSize = 'md',
    hasError = false,
    width,
    onMouseDown,
    style,
    ...props
}) => {
    const pointerDownRef = useRef(false)

    const handleMouseDown: NonNullable<BaseAutocomplete.Input.Props['onMouseDown']> = useCallback(
        (event) => {
            pointerDownRef.current = true
            onMouseDown?.(event)
        },
        [onMouseDown],
    )

    const handleFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        if (pointerDownRef.current) {
            event.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
    }, [])

    const handleBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        pointerDownRef.current = false
        event.currentTarget.removeAttribute('data-mouse-focus')
    }, [])

    const mergedStyle = width !== undefined ? { ...style, width } : style

    return (
        <>
            {startIcon && (
                <TextFieldStartIcon
                    icon={startIcon}
                    size={size}
                />
            )}
            <BaseAutocomplete.Input
                className={cn(
                    AUTOCOMPLETE_INPUT_STYLES.recipe({
                        size,
                        hasError,
                        hasStartIcon: Boolean(startIcon),
                        hasEndAction: false,
                    }),
                    className,
                )}
                style={{ fontSize: vars.fontSize[fontSize], ...mergedStyle }}
                placeholder={placeholder}
                onMouseDown={handleMouseDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
        </>
    )
})

AutocompleteInput.displayName = 'Autocomplete.Input'

export default AutocompleteInput
