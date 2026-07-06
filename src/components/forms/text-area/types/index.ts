import type { FC } from 'react'

import type TextAreaEndAction from '@components/forms/text-area/components/text-area-end-action/TextAreaEndAction.tsx'
import type TextAreaLabel from '@components/forms/text-area/components/text-area-label/TextAreaLabel.tsx'
import type TextAreaStartIcon from '@components/forms/text-area/components/text-area-start-icon/TextAreaStartIcon.tsx'
import type { TextAreaProps } from '@components/forms/text-area/types/TextArea.props.ts'

export type TextAreaCompound = FC<TextAreaProps> & {
    Label: typeof TextAreaLabel
    StartIcon: typeof TextAreaStartIcon
    EndAction: typeof TextAreaEndAction
}
