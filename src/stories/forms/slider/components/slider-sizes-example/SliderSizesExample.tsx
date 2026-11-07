import { Slider } from '@components/forms/slider'
import type { ReactElement } from 'react'

/**
 * Renders the Slider Sizes example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SliderSizesExample />
 */
const SliderSizesExample = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <Slider
            label={'Small'}
            size={'sm'}
            width={'100%'}
            defaultValue={40}
        />
        <Slider
            label={'Medium'}
            size={'md'}
            width={'100%'}
            defaultValue={40}
        />
        <Slider
            label={'Large'}
            size={'lg'}
            width={'100%'}
            defaultValue={40}
        />
    </div>
)

export default SliderSizesExample
