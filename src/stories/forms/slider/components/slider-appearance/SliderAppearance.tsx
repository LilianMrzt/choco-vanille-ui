import SliderColorsExample from '@stories/forms/slider/components/slider-colors-example/SliderColorsExample'
import SliderOrientations from '@stories/forms/slider/components/slider-orientations/SliderOrientations'
import type { ReactElement } from 'react'

/**
 * Compares colors and orientations separately from the Sizes story.
 * @internal Not part of the public package API.
 * @returns Labeled appearance sections.
 * @example
 * <SliderAppearance />
 */
const SliderAppearance = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', width: 'min(100%, 48rem)' }}>
        <section aria-label={'Colors'}>
            <h3>Colors</h3>
            <SliderColorsExample />
        </section>
        <section aria-label={'Orientations'}>
            <h3>Orientations</h3>
            <SliderOrientations />
        </section>
    </div>
)

export default SliderAppearance
