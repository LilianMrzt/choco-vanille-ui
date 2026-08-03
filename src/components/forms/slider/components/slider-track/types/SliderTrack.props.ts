import type { SliderColor, SliderSize } from '@components/forms/slider/types/Slider.types.ts'

export type SliderTrackProps = {
    range: boolean
    size: SliderSize
    color: SliderColor
    error?: string
    descriptionId?: string
}
