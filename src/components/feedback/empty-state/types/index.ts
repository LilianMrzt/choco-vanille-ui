import type * as React from 'react'

/** Props for an empty result state displayed in a list or table. */
export type EmptyStateProps = Readonly<
    Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> &
    React.RefAttributes<HTMLDivElement> & {
        /** Heading displayed for the empty state. */
        title: React.ReactNode
        /** Supporting explanation displayed below the heading. */
        description: React.ReactNode
        /** Optional action, such as a Button or Link. */
        action?: React.ReactNode
    }
>
