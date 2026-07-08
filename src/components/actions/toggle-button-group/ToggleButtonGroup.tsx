import * as React from 'react'

import { ToggleGroup as BaseToggleGroup, type ToggleGroup } from '@base-ui/react/toggle-group'

import ToggleButtonGroupItem from '@components/actions/toggle-button-group/components/toggle-button-group-item/ToggleButtonGroupItem.tsx'
import { TOGGLE_BUTTON_GROUP_STYLES } from '@components/actions/toggle-button-group/styles/ToggleButtonGroup.css.ts'
import type { ToggleButtonGroupCompound } from '@components/actions/toggle-button-group/types/ToggleButtonGroupCompound.ts'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * A group of toggle buttons where one or many buttons can be pressed at a time.
 * Built on top of `@base-ui/react/toggle-group`.
 *
 * Use `ToggleButtonGroup.Item` for each option so the styling is cohesive with
 * the group container.
 *
 * @example
 * ```tsx
 * <ToggleButtonGroup value={value} onValueChange={setValue}>
 *   <ToggleButtonGroup.Item value="bold" label="Bold" />
 *   <ToggleButtonGroup.Item value="italic" label="Italic" />
 * </ToggleButtonGroup>
 * ```
 */
const ToggleButtonGroup = (({
    className,
    orientation = 'horizontal',
    backgroundColor,
    requireSelection = true,
    style,
    value,
    defaultValue,
    onValueChange,
    children,
    ref,
    ...props
}) => {
    const [internalValue, setInternalValue] = React.useState<readonly string[]>(defaultValue ?? value ?? [])
    const isControlled = value !== undefined
    const currentValue = isControlled ? value : internalValue

    const handleValueChange = (newValue: string[], eventDetails: ToggleGroup.ChangeEventDetails) => {
        if (requireSelection && newValue.length === 0) {
            return
        }
        if (!isControlled) {
            setInternalValue(newValue)
        }
        onValueChange?.(newValue, eventDetails)
    }

    return (
        <BaseToggleGroup
            ref={ref}
            className={cn(TOGGLE_BUTTON_GROUP_STYLES.recipe({ orientation }), className)}
            orientation={orientation}
            value={currentValue}
            onValueChange={handleValueChange}
            style={backgroundColor ? { ...style, backgroundColor: vars.color[backgroundColor] } : style}
            {...props}
        >
            {children}
        </BaseToggleGroup>
    )
}) as ToggleButtonGroupCompound

ToggleButtonGroup.displayName = 'ToggleButtonGroup'
ToggleButtonGroup.Item = ToggleButtonGroupItem

export default ToggleButtonGroup
