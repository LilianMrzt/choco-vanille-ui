import type { EmptyStateProps } from '@components/feedback/empty-state'

export type EmptyStateStoryArgs = Readonly<Omit<EmptyStateProps, 'title' | 'description'> & {
    title: string
    description: string
    showAction: boolean
}>
