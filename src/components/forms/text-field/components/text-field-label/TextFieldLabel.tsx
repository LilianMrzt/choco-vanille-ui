import { memo, type FC } from 'react'
import { TEXT_FIELD_LABEL_STYLES } from '@components/forms/text-field/components/text-field-label/styles/TextFieldLabel.css.ts'
import type {
    TextFieldLabelProps
} from '@components/forms/text-field/components/text-field-label/types/TextFieldLabel.props.ts'

const TextFieldLabel: FC<TextFieldLabelProps> = memo(({ htmlFor, disabled, required, children }) => (
    <label
        htmlFor={htmlFor}
        className={TEXT_FIELD_LABEL_STYLES.root}
        data-disabled={disabled ? '' : undefined}
    >
        {children}
        {required && (
            <span
                className={TEXT_FIELD_LABEL_STYLES.requiredIndicator}
                aria-hidden={'true'}
            >
                {' *'}
            </span>
        )}
    </label>
))

TextFieldLabel.displayName = 'TextField.Label'

export default TextFieldLabel
