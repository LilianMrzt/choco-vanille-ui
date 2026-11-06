import { Field } from '@base-ui/react/field'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { memo, type FC, useId } from 'react'

import HelperText from '@components/forms/_shared/components/helper-text/HelperText.tsx'
import SliderHeader from '@components/forms/slider/components/slider-header/SliderHeader.tsx'
import SliderTrack from '@components/forms/slider/components/slider-track/SliderTrack.tsx'
import { SLIDER_STYLES } from '@components/forms/slider/styles/Slider.css.ts'
import type { SliderProps } from '@components/forms/slider/types'
import { cn } from '@utils/cn.ts'

/**
 * Range input backed by Base UI Slider with a visible label, helper/error
 * text, and design-token `size` and `color` props. Supports both single-value
 * and multi-thumb range mode (pass an array for `value`/`defaultValue`).
 */
export const Slider: FC<SliderProps> = memo(({
    label,
    showValue = false,
    helperText,
    error,
    width = '100%',
    size = 'md',
    color = 'primary',
    className,
    ref,
    value,
    defaultValue,
    'aria-describedby': ariaDescribedBy,
    ...props
}) => {
    const descriptionId = useId()
    const labelId = useId()
    const hasDescription = Boolean(error || helperText)
    const range = Array.isArray(value ?? defaultValue)
    const describedBy = [ariaDescribedBy, hasDescription ? descriptionId : undefined].filter(Boolean).join(' ') || undefined

    return (
        <Field.Root invalid={Boolean(error)}>
            <BaseSlider.Root
                ref={ref}
                className={cn(SLIDER_STYLES.root, className)}
                style={{ width }}
                aria-labelledby={label ? labelId : undefined}
                aria-describedby={describedBy}
                value={value}
                defaultValue={defaultValue}
                {...props}
            >
                <SliderHeader
                    label={label}
                    labelId={labelId}
                    showValue={showValue}
                />
                <SliderTrack
                    range={range}
                    size={size}
                    color={color}
                    error={error}
                    descriptionId={describedBy}
                />
                {hasDescription && (
                    <HelperText
                        id={descriptionId}
                        hasError={Boolean(error)}
                    >
                        {error ?? helperText}
                    </HelperText>
                )}
            </BaseSlider.Root>
        </Field.Root>
    )
})

Slider.displayName = 'Slider'

export default Slider
