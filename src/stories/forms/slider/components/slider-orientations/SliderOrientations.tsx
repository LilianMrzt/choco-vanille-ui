import { Slider } from '@components/forms/slider'
import type { ReactElement } from 'react'

/**
 * Compares keyboard-operable horizontal and vertical sliders.
 * @internal Not part of the public package API.
 * @returns Two independently labeled orientation examples.
 * @example
 * <SliderOrientations />
 */
const SliderOrientations = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', width: 'min(100%, 24rem)' }}>
        <Slider
            defaultValue={40}
            label={'Horizontal'}
            orientation={'horizontal'}
        />
        <Slider
            defaultValue={40}
            label={'Vertical'}
            orientation={'vertical'}
        />
    </div>
)

export default SliderOrientations
