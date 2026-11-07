import { Slider } from '@components/forms/slider'
import type { ReactElement } from 'react'

/**
 * Renders the Slider Colors example.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <SliderColorsExample />
 */
const SliderColorsExample = (): ReactElement => (
    <div style={{ display: 'grid', gap: '1rem', width: 'min(100%, 24rem)' }}>
        <Slider
            label={'Primary'}
            color={'primary'}
            defaultValue={40}
        />
        <Slider
            label={'Secondary'}
            color={'secondary'}
            defaultValue={40}
        />
        <Slider
            label={'Destructive'}
            color={'destructive'}
            defaultValue={40}
        />
    </div>
)

export default SliderColorsExample
