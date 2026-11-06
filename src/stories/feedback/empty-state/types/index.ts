import type { EmptyStateProps } from '@components/feedback/empty-state'

export type EmptyStateStoryArgs = Omit<EmptyStateProps, 'title' | 'description' | 'action'> & {
    title: string
    description: string
    showAction: boolean
}
