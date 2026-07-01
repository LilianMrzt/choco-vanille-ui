import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import RadioItem from '@components/forms/radio-group/components/radio-item/RadioItem.tsx'
import type { RadioGroupCompound } from '@components/forms/radio-group/types'
import { Flex } from '@components/layout/flex'

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
const RadioGroup = (({ className, children, ...props }) => (
    <RadixRadioGroup.Root
        asChild
        {...props}
    >
        <Flex
            direction={'column'}
            gap={'sm'}
            align={'start'}
            className={className}
        >
            {children}
        </Flex>
    </RadixRadioGroup.Root>
)) as RadioGroupCompound

RadioGroup.displayName = 'RadioGroup'
RadioGroup.Item = RadioItem

export default RadioGroup
