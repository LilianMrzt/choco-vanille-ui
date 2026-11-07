import { Slider } from '@components/forms/slider'
import type { ReactElement } from 'react'

/**
 * Renders the Slider Range example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SliderRangeExample />
 */
const SliderRangeExample = (): ReactElement => (
    <Slider
        label={'Price'}
        defaultValue={[20, 80]}
        showValue
    />
)

export default SliderRangeExample
