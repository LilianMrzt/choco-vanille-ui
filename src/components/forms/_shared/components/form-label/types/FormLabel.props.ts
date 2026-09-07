import type * as React from 'react'

import type { TypographySize } from '@components/foundation/typography/types/Typography.types.ts'

export type FormLabelProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /** Font size applied to the label. @default 'md' */
    fontSize?: TypographySize
    /** Applies the disabled label presentation. */
    disabled?: boolean
    /** Marks the associated field as required with the standard indicator. */
    required?: boolean
    children: React.ReactNode
}
