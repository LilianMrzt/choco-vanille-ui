import type * as React from 'react'

export type StepIndicatorItemProps = {
    /** Accessible name announced for this step. */
    label: string
    /** Prevents this step from being selected. */
    disabled?: boolean
    /** Ref forwarded to the interactive step button. */
    ref?: React.Ref<HTMLButtonElement>
}
