import { Field } from '@base-ui/react/field'
import { Slider as BaseSlider } from '@base-ui/react/slider'
import { memo, type FC, useId } from 'react'

import SliderHeader from '@components/forms/slider/components/slider-header/SliderHeader.tsx'
import SliderTrack from '@components/forms/slider/components/slider-track/SliderTrack.tsx'
import { SLIDER_STYLES } from '@components/forms/slider/styles/Slider.css.ts'
import type { SliderProps } from '@components/forms/slider/types'
import { cn } from '@utils/cn.ts'

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
    ...props
}) => {
    const descriptionId = useId()
    const hasDescription = Boolean(error || helperText)
    const range = Array.isArray(value ?? defaultValue)

    return (
        <Field.Root invalid={Boolean(error)}>
            <BaseSlider.Root
                ref={ref}
                className={cn(SLIDER_STYLES.root, className)}
                style={{ width }}
                aria-describedby={hasDescription ? descriptionId : undefined}
                value={value}
                defaultValue={defaultValue}
                {...props}
            >
                <SliderHeader
                    label={label}
                    showValue={showValue}
                />
                <SliderTrack
                    range={range}
                    size={size}
                    color={color}
                    error={error}
                    descriptionId={hasDescription ? descriptionId : undefined}
                />
                {hasDescription && (
                    <span
                        id={descriptionId}
                        className={error ? SLIDER_STYLES.error : SLIDER_STYLES.helper}
                    >
                        {error ?? helperText}
                    </span>
                )}
            </BaseSlider.Root>
        </Field.Root>
    )
})

Slider.displayName = 'Slider'

export default Slider
