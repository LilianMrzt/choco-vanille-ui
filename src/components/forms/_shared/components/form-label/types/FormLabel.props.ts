import type * as React from 'react'

import type { TypographySize } from '@components/foundation/typography/types/Typography.types.ts'

export type FormLabelProps = Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'children'> &
    React.RefAttributes<HTMLLabelElement> & {
        /** Font size applied to the label. @default 'md' */
        fontSize?: TypographySize
        /** Marks the associated field as required with the standard indicator. */
        required?: boolean
        /** Applies the disabled label presentation. */
        disabled?: boolean
        children: React.ReactNode
    }
