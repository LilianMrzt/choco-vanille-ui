import { Slider as BaseSlider } from '@base-ui/react/slider'

import { SLIDER_HEADER_STYLES } from '@components/forms/slider/components/slider-header/styles/SliderHeader.css.ts'
import type { SliderHeaderProps } from '@components/forms/slider/components/slider-header/types/SliderHeader.props.ts'

const SliderHeader = ({ label, showValue }: SliderHeaderProps) => (
    <div className={SLIDER_HEADER_STYLES.root}>
        {label && <BaseSlider.Label className={SLIDER_HEADER_STYLES.label}>{label}</BaseSlider.Label>}
        {showValue && (
            <BaseSlider.Value className={SLIDER_HEADER_STYLES.value}>
                {(formattedValues) => formattedValues.join(' – ')}
            </BaseSlider.Value>
        )}
    </div>
)

export default SliderHeader
