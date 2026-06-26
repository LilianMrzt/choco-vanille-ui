import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { FC } from 'react'

import { Flex } from '@components/layout/flex'
import type { RadioGroupProps } from '@components/forms/radio-group/types/RadioGroup.props.ts'

/**
 * The root container for a group of `RadioItem` components.
 * Manages the single-selection state.
 *
 * @example
 * ```tsx
 * <RadioGroup value={value} onValueChange={setValue}>
 *   <RadioItem value="a" label="Option A" />
 *   <RadioItem value="b" label="Option B" />
 * </RadioGroup>
 * ```
 */
const RadioGroup: FC<RadioGroupProps> = ({ className, children, ...props }) => (
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
)

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
