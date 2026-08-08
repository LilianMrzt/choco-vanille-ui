import type { ReactNode } from 'react'
import type { TypographySize } from '@components/foundation/typography/types/Typography.types.ts'

export type TextAreaLabelProps = {
    htmlFor?: string
    disabled?: boolean
    /** Font size applied to the label. @default 'md' */
    fontSize?: TypographySize
    children: ReactNode
}
