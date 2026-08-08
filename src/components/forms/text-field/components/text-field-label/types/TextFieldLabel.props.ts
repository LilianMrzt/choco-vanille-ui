import type { ReactNode } from 'react'
import type { TypographySize } from '@components/foundation/typography/types/Typography.types.ts'

export type TextFieldLabelProps = {
    htmlFor?: string
    disabled?: boolean
    required?: boolean
    /** Font size applied to the label. @default 'md' */
    fontSize?: TypographySize
    children: ReactNode
}
