import { type ComponentProps, type ReactElement } from 'react'
import { useArgs } from 'storybook/preview-api'
import { RadioGroup } from '@/components/forms/radio-group'
import type { RadioGroupPlaygroundArgs } from '@stories/forms/radio-group/types'
/**
 * Renders the RadioGroup interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledRadioGroup />
 */
const ControlledRadioGroup = (_args: RadioGroupPlaygroundArgs): ReactElement => {
    const [args, updateArgs] = useArgs<RadioGroupPlaygroundArgs>()
    const { labelOne, labelTwo, labelThree, ...groupProps } = args
    const handleValueChange: NonNullable<ComponentProps<typeof RadioGroup>['onValueChange']> = (value, details) => {
        groupProps.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <RadioGroup
            {...groupProps}
            onValueChange={handleValueChange}
        >
            <RadioGroup.Item
                value={'light'}
                label={labelOne}
            />
            <RadioGroup.Item
                value={'dark'}
                label={labelTwo}
            />
            <RadioGroup.Item
                value={'system'}
                label={labelThree}
            />
        </RadioGroup>
    )
}

export default ControlledRadioGroup
