import type * as React from 'react'

export type FormLabelProps = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
    /** Applies the disabled label presentation. */
    disabled?: boolean
    /** Marks the associated field as required with the standard indicator. */
    required?: boolean
    children: React.ReactNode
}
