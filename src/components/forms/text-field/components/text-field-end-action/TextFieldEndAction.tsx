import { memo, type FC } from 'react'
import { TEXT_FIELD_END_ACTION_STYLES } from '@components/forms/text-field/components/text-field-end-action/styles/TextFieldEndAction.css.ts'
import type { TextFieldEndActionProps } from '@components/forms/text-field/components/text-field-end-action/types/TextFieldEndAction.props.ts'

const TextFieldEndAction: FC<TextFieldEndActionProps> = memo(({ children }) => (
    <span className={TEXT_FIELD_END_ACTION_STYLES.root}>
        {children}
    </span>
))

TextFieldEndAction.displayName = 'TextField.EndAction'

export default TextFieldEndAction
