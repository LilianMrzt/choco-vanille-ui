import type { StepIndicatorProps } from '@components/navigation/step-indicator'

/** @internal Storybook-only args; not part of the public package API. */
export type StepIndicatorStoryArgs = Readonly<Omit<StepIndicatorProps, 'children'> & {
    accountLabel: string
    preferencesLabel: string
    reviewLabel: string
    confirmationLabel: string
    firstDisabled?: boolean
}>
