import type { Slider as BaseSlider } from '@base-ui/react/slider'
import type * as React from 'react'

import type { SliderColor, SliderSize } from '@components/forms/slider/types/Slider.types.ts'

type SliderAccessibleName =
    | { label: string; 'aria-label'?: never; 'aria-labelledby'?: never }
    | { label?: never; 'aria-label': string; 'aria-labelledby'?: never }
    | { label?: never; 'aria-label'?: never; 'aria-labelledby': string }

export type SliderFieldProps = {
    /** Visual size. Defaults to `md`. */
    size?: SliderSize
    /** Semantic color intent. Defaults to `primary`. */
    color?: SliderColor
    /** Width of the field wrapper. Defaults to `100%`. */
    width?: React.CSSProperties['width']
    /** Displays the current value next to the label. */
    showValue?: boolean
    /** Help text announced together with the slider. */
    helperText?: string
    /** Error text announced together with the slider and marks it invalid. */
    error?: string
}

export type SliderControlProps<Value extends number | readonly number[]> = Omit<
    BaseSlider.Root.Props<Value>,
    'children' | 'className' | 'aria-label' | 'aria-labelledby'
> &
    SliderFieldProps &
    SliderAccessibleName & {
        className?: string
        ref?: React.Ref<HTMLDivElement>
    }

export type SliderProps = SliderControlProps<number | readonly [number, number]>
