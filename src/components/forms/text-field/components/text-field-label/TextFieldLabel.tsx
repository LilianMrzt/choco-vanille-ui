import * as RadixLabel from '@radix-ui/react-label'
import type { FC } from 'react'
import { TEXT_FIELD_LABEL_STYLES } from '@components/forms/text-field/components/text-field-label/TextFieldLabel.css.ts'
import type {
    TextFieldLabelProps
} from '@components/forms/text-field/components/text-field-label/types/TextFieldLabel.props.ts'

const TextFieldLabel: FC<TextFieldLabelProps> = ({ htmlFor, disabled, children }) => (
    <RadixLabel.Root
        htmlFor={htmlFor}
        className={TEXT_FIELD_LABEL_STYLES.root}
        data-disabled={disabled ? '' : undefined}
    >
        {children}
    </RadixLabel.Root>
)

TextFieldLabel.displayName = 'TextFieldLabel'

export default TextFieldLabel
