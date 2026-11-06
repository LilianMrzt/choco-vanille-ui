import { Select as BaseSelect } from '@base-ui/react/select'
import { type CSSProperties, memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import ChevronDownIcon from '@resources/asset/ChevronDownIcon.svg?react'
import { Box } from '@components/layout/box'
import { TextFieldStartIcon } from '@components/forms/text-field/components'
import {
    SELECT_TRIGGER_STYLES,
    SELECT_TRIGGER_END_ICON,
} from '@components/forms/select/components/select-trigger/styles/SelectTrigger.css.ts'
import { cn } from '@utils/cn.ts'
import type { SelectTriggerProps } from '@components/forms/select/components/select-trigger/types/SelectTrigger.props.ts'
import useSelectTrigger from '@components/forms/select/components/select-trigger/hooks/useSelectTrigger.hook.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
  * The trigger button that opens the listbox.
  *
  * Looks exactly like a TextField input: same height, padding, border, focus
  * ring and disabled state. A chevron icon is rendered in the end-action slot
  * (mirroring TextField's endAction pattern). Supports `size`, `startIcon`,
  * `placeholder`, `hasError` and `width`.
  */
const SelectTrigger: FC<SelectTriggerProps> = memo(({
    className,
    placeholder,
    startIcon,
    size = 'md',
    hasError = false,
    width,
    children,
    onMouseDown,
    onFocus,
    onBlur,
    style,
    ...props
}) => {
    const { handleMouseDown, handleFocus, handleBlur, mergedStyle } =
        useSelectTrigger({
            width,
            style: style as CSSProperties | undefined,
            onMouseDown,
            onFocus,
            onBlur,
        })

    return (
        <BaseSelect.Trigger
            {...props}
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
        >
            {startIcon && (
                <TextFieldStartIcon
                    icon={startIcon}
                    size={size}
                />
            )}
            {children ?? <BaseSelect.Value placeholder={placeholder} />}
            <Box className={SELECT_TRIGGER_END_ICON}>
                <Icon
                    icon={ChevronDownIcon}
                    size={'md'}
                    color={vars.color.surface.mutedForeground}
                />
            </Box>
        </BaseSelect.Trigger>
    )
})

SelectTrigger.displayName = 'Select.Trigger'

export default SelectTrigger
