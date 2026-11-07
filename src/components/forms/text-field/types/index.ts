import type { FC } from 'react'

import type TextFieldEndAction from '@components/forms/text-field/components/text-field-end-action/TextFieldEndAction.tsx'
import type TextFieldStartIcon from '@components/forms/text-field/components/text-field-start-icon/TextFieldStartIcon.tsx'
import type FormLabel from '@components/forms/primitives/form-label/FormLabel.tsx'
import type { TextFieldProps } from '@components/forms/text-field/types/TextField.props.ts'

export type TextFieldCompound = FC<TextFieldProps> & {
    Label: typeof FormLabel
    StartIcon: typeof TextFieldStartIcon
    EndAction: typeof TextFieldEndAction
}
