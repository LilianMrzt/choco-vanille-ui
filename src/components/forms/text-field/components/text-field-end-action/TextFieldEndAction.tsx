import type { FC, ReactNode } from 'react'
import {
    textFieldEndActionClass
} from '@components/forms/text-field/components/text-field-end-action/TextFieldEndAction.css.ts'

type TextFieldEndActionProps = {
    children: ReactNode
}

const TextFieldEndAction: FC<TextFieldEndActionProps> = ({ children }) => (
    <span className={textFieldEndActionClass}>
        {children}
    </span>
)

TextFieldEndAction.displayName = 'TextFieldEndAction'

export default TextFieldEndAction
