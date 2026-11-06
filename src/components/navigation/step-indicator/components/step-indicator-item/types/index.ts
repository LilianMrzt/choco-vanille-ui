import type * as React from 'react'

/** Props for an individual step indicator dot. */
export type StepIndicatorItemProps = Readonly<{
    /** Accessible name announced for this step. */
    label: string
    /** Prevents this step from being selected. */
    disabled?: boolean
    /** Ref forwarded to the interactive step button. */
    ref?: React.Ref<HTMLButtonElement>
}>
