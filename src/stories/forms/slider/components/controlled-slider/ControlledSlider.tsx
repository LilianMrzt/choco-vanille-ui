import { useArgs } from 'storybook/preview-api'
import { Slider, type SliderProps } from '@components/forms/slider'
import type { ReactElement } from 'react'

/**
 * Renders the Slider interactive example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <ControlledSlider />
 */
const ControlledSlider = (_args: SliderProps): ReactElement => {
    const [args, updateArgs] = useArgs<SliderProps>()
    const handleValueChange: NonNullable<SliderProps['onValueChange']> = (value, details) => {
        args.onValueChange?.(value, details)
        if (!details.isCanceled) {
            updateArgs({ value })
        }
    }

    return (
        <Slider
            {...args}
            onValueChange={handleValueChange}
        />
    )
}

export default ControlledSlider
