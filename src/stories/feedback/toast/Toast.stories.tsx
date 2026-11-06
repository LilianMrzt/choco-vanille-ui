import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@components/actions/button'
import { Toast } from '@components/feedback/toast'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import ToastDocsPage from '@stories/feedback/toast/components/toast-docs-page/ToastDocsPage'
import ToastTriggers from '@stories/feedback/toast/components/toast-triggers/ToastTriggers'
import ToastVariants from '@stories/feedback/toast/components/toast-variants/ToastVariants'
import { ARG_TYPES, DEFAULT_ARGS, type ToastStoryArgs } from '@stories/feedback/toast/constants'
import triggersSource from '@stories/feedback/toast/sources/ToastTriggers.source.tsx.txt?raw'
import variantsSource from '@stories/feedback/toast/sources/ToastVariants.source.tsx.txt?raw'
import { createToastSource } from '@stories/feedback/toast/utils/create-toast-source/createToastSource.utils'
import { storySource } from '@stories/_shared/utils/storySource'

const meta = {
    title: 'Feedback/Toast',
    component: Toast,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'A notification card with convenience props and compound slots. Mount ToastProvider once near the application root to use the toast and notification hooks. Supply your own icon component for a custom icon.',
            },
            page: ToastDocsPage,
            source: { type: 'dynamic', transform: createToastSource },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
} satisfies Meta<ToastStoryArgs>

export default meta

type Story = StoryObj<ToastStoryArgs>

export const Playground: Story = {
    render: ({ variant, role, title, description, showCustomIcon, showTitle, showDescription, showClose, showActions, actionLabel, closeLabel }) => (
        <Toast
            variant={variant}
            role={role}
        >
            {showCustomIcon && <Toast.Icon icon={InfoIcon} />}
            {showTitle && <Toast.Title>{title}</Toast.Title>}
            {showDescription && <Toast.Description>{description}</Toast.Description>}
            {showActions && (
                <Toast.Actions>
                    <Button
                        size={'sm'}
                        label={actionLabel}
                    />
                </Toast.Actions>
            )}
            {showClose && <Toast.Close aria-label={closeLabel} />}
        </Toast>
    ),
}

export const Variants: Story = {
    parameters: { docs: { ...storySource(variantsSource) } },
    render: ToastVariants,
}

export const Triggers: Story = {
    parameters: {
        docs: {
            description: { story: 'Storybook mounts the provider globally. Toasts are transient; notifications persist until dismissed.' },
            ...storySource(triggersSource),
        },
    },
    render: ToastTriggers,
}
