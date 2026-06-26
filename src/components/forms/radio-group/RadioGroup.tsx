import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import type { FC } from 'react'

import { cn } from '@utils/cn.ts'
import { radioGroupRootClass } from '@components/forms/radio-group/RadioGroup.css.ts'
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
const RadioGroup: FC<RadioGroupProps> = ({ className, ...props }) => (
    <RadixRadioGroup.Root
        className={cn(radioGroupRootClass, className)}
        {...props}
    />
)

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
