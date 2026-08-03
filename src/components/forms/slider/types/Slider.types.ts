import type { SLIDER_COLORS, SLIDER_SIZES } from '@components/forms/slider/constants'

export type SliderSize = (typeof SLIDER_SIZES)[keyof typeof SLIDER_SIZES]
export type SliderColor = (typeof SLIDER_COLORS)[keyof typeof SLIDER_COLORS]
