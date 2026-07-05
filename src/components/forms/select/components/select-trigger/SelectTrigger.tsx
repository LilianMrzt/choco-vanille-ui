import * as RadixSelect from '@radix-ui/react-select'
import { useRef, type FC, type MouseEventHandler } from 'react'

import { Icon } from '@components/foundation/icon'
import { Box } from '@components/layout/box'
import { TextFieldStartIcon } from '@components/forms/text-field/components'
import {
    SELECT_TRIGGER_STYLES,
    SELECT_TRIGGER_END_ICON,
} from '@components/forms/select/components/select-trigger/SelectTrigger.css.ts'
import { cn } from '@utils/cn.ts'
import type { SelectTriggerProps } from '@components/forms/select/components/select-trigger/types/SelectTrigger.props.ts'

/**
 * The trigger button that opens the listbox.
 *
 * Looks exactly like a TextField input: same height, padding, border, focus
 * ring and disabled state. A chevron icon is rendered in the end-action slot
 * (mirroring TextField's endAction pattern). Supports `size`, `startIcon`,
 * `placeholder`, `hasError` and `width`.
 */
const SelectTrigger: FC<SelectTriggerProps> = ({
    className,
    placeholder,
    startIcon,
    size = 'md',
    hasError = false,
    width,
    children,
    onMouseDown,
    style,
    ...props
}) => {
    const pointerDownRef = useRef(false)

    const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
        pointerDownRef.current = true
        onMouseDown?.(event)
    }

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (pointerDownRef.current) {
            event.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        pointerDownRef.current = false
        event.currentTarget.removeAttribute('data-mouse-focus')
    }

    const mergedStyle = width !== undefined ? { ...style, width } : style

    return (
        <RadixSelect.Trigger
            className={cn(
                SELECT_TRIGGER_STYLES.recipe({
                    size,
                    hasError,
                    hasStartIcon: Boolean(startIcon),
                }),
                className,
            )}
            style={mergedStyle}
            onMouseDown={handleMouseDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
        >
            {startIcon && (
                <TextFieldStartIcon
                    icon={startIcon}
                    size={size}
                />
            )}
            {children ?? (
                <RadixSelect.Value placeholder={placeholder} />
            )}
            <Box className={SELECT_TRIGGER_END_ICON}>
                <Icon
                    icon={'mdi:chevron-down'}
                    size={'md'}
                    color={'mutedForeground'}
                />
            </Box>
        </RadixSelect.Trigger>
    )
}

SelectTrigger.displayName = 'SelectTrigger'

export default SelectTrigger
