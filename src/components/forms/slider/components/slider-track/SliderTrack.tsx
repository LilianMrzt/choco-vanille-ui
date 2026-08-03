import { Slider as BaseSlider } from '@base-ui/react/slider'

import { SLIDER_TRACK_STYLES } from '@components/forms/slider/components/slider-track/styles/SliderTrack.css.ts'
import type { SliderTrackProps } from '@components/forms/slider/components/slider-track/types/SliderTrack.props.ts'

const SliderTrack = ({ range, size, color, error, descriptionId }: SliderTrackProps) => {
    const thumbIndexes = range ? [0, 1] : [0]

    return (
        <BaseSlider.Control className={SLIDER_TRACK_STYLES.control}>
            <BaseSlider.Track className={SLIDER_TRACK_STYLES.track({ size })}>
                <BaseSlider.Indicator className={SLIDER_TRACK_STYLES.indicator({ color })} />
            </BaseSlider.Track>
            {thumbIndexes.map((index) => (
                <BaseSlider.Thumb
                    key={index}
                    index={range ? index : undefined}
                    className={SLIDER_TRACK_STYLES.thumb({ size, color })}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={descriptionId}
                />
            ))}
        </BaseSlider.Control>
    )
}

export default SliderTrack
