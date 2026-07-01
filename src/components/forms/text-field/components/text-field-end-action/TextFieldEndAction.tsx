import type { FC, ReactNode } from 'react'
import { TEXT_FIELD_END_ACTION_STYLES } from '@components/forms/text-field/components/text-field-end-action/TextFieldEndAction.css.ts'

type TextFieldEndActionProps = {
    children: ReactNode
}

const TextFieldEndAction: FC<TextFieldEndActionProps> = ({ children }) => (
    <span className={TEXT_FIELD_END_ACTION_STYLES.root}>
        {children}
    </span>
)

TextFieldEndAction.displayName = 'TextFieldEndAction'

export default TextFieldEndAction
