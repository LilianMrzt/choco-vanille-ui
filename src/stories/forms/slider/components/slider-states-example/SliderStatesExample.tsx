import { Slider } from '@components/forms/slider'
import type { ReactElement } from 'react'

/**
 * Renders the Slider States example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SliderStatesExample />
 */
const SliderStatesExample = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <Slider
            label={'Disabled'}
            disabled
            defaultValue={40}
        />
        <Slider
            label={'With helper'}
            helperText={'Choose a value'}
            defaultValue={40}
        />
        <Slider
            label={'With error'}
            error={'Value is invalid'}
            defaultValue={40}
        />
    </div>
)

export default SliderStatesExample
