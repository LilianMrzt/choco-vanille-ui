import type { CalloutProps, CalloutRole, CalloutVariant } from '@components/feedback/callout'

export type CalloutStoryArgs = Readonly<Omit<CalloutProps, 'title' | 'description' | 'variant' | 'role'> & {
    variant: CalloutVariant
    role: CalloutRole
    title: string
    description: string
    showCustomIcon: boolean
    showTitle: boolean
    showDescription: boolean
    showAction: boolean
    actionLabel: string
    onActionClick?: () => void
}>
