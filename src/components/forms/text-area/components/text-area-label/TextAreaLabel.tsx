import type { FC } from 'react'
import { TEXT_AREA_LABEL_STYLES } from '@components/forms/text-area/components/text-area-label/TextAreaLabel.css.ts'
import type { TextAreaLabelProps } from '@components/forms/text-area/components/text-area-label/types/TextAreaLabel.props.ts'

const TextAreaLabel: FC<TextAreaLabelProps> = ({ htmlFor, disabled, children }) => (
    <label
        htmlFor={htmlFor}
        className={TEXT_AREA_LABEL_STYLES.root}
        data-disabled={disabled ? '' : undefined}
    >
        {children}
    </label>
)

TextAreaLabel.displayName = 'TextAreaLabel'

export default TextAreaLabel
