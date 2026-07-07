import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group'

import RadioItem from '@components/forms/radio-group/components/radio-item/RadioItem.tsx'
import type { RadioGroupCompound } from '@components/forms/radio-group/types'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'

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
const RadioGroup = (({ className, children, onValueChange, ...props }) => (
    <BaseRadioGroup
        className={cn(className)}
        onValueChange={(value, eventDetails) => { onValueChange?.(value, eventDetails) }}
        {...props}
    >
        <Flex
            flexDirection={'column'}
            gap={'sm'}
            alignItems={'start'}
        >
            {children}
        </Flex>
    </BaseRadioGroup>
)) as RadioGroupCompound

RadioGroup.displayName = 'RadioGroup'
RadioGroup.Item = RadioItem

export default RadioGroup
