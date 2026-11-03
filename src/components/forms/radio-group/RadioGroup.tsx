import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'

import RadioItem from '@components/forms/radio-group/components/radio-item/RadioItem.tsx'
import type { RadioGroupCompound } from '@components/forms/radio-group/types'
import type { RadioGroupProps } from '@components/forms/radio-group/types/RadioGroup.props.ts'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { memo, useCallback } from 'react'

/**
 * The root container for a group of `RadioGroup.Item` components.
 * Manages the single-selection state.
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioGroup.Item value="a" label="Option A" />
 *   <RadioGroup.Item value="b" label="Option B" />
 * </RadioGroup>
 * ```
 */
const RadioGroup = memo<RadioGroupProps>(({ className, children, onValueChange, ...props }) => {
    const handleValueChange = useCallback(
        (...args: Parameters<NonNullable<RadioGroupProps['onValueChange']>>) => { onValueChange?.(...args) },
        [onValueChange],
    )

    return (
        <BaseRadioGroup
            className={cn(className)}
            onValueChange={handleValueChange}
            {...props}
        >
            <Flex
                flexDirection={'column'}
                gap={8}
                alignItems={'start'}
            >
                {children}
            </Flex>
        </BaseRadioGroup>
    )
}) as unknown as RadioGroupCompound

RadioGroup.displayName = 'RadioGroup'
RadioGroup.Item = RadioItem

export default RadioGroup
