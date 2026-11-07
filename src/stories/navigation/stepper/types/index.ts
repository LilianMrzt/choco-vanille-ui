import type { ComponentProps } from 'react'
import type { Stepper, StepperItemSize } from '@components/navigation/stepper'

/** @internal Storybook-only args; not part of the public package API. */
export type StepperStoryArgs = Readonly<ComponentProps<typeof Stepper> & {
    accountLabel: string
    preferencesLabel: string
    reviewLabel: string
    firstDescription?: string
    firstDisabled?: boolean
    firstSize?: StepperItemSize
}>
