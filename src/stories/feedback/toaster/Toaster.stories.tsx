import type { Meta, StoryObj } from '@storybook/react-vite'

import { ToasterProvider, type ToasterProviderProps } from '@components/feedback/toaster-provider'
import ToasterPlayground from '@stories/feedback/toaster/components/toaster-playground/ToasterPlayground'
import ToasterDocsPage from '@stories/feedback/toaster/components/toaster-docs-page/ToasterDocsPage'
import ToasterStoryLayout from '@stories/feedback/toaster/components/toaster-story-layout/ToasterStoryLayout'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/feedback/toaster/constants'
import type { ToasterStoryArgs } from '@stories/feedback/toaster/types'
import { createToasterSource } from '@stories/feedback/toaster/utils/create-toaster-source/createToasterSource.utils'

const meta = {
    title: 'Feedback/Toaster',
    component: ToasterProvider,
    tags: ['autodocs'],
    args: DEFAULT_ARGS,
    argTypes: {
        ...ARG_TYPES,
        children: { control: false, description: 'Application content; demonstrated by the trigger controls.' },
    },
    render: (args) => <ToasterPlayground {...args} />,
    decorators: [
        (Story, { args }) => (
            <ToasterStoryLayout
                className={args.className}
                notificationLabel={args.notificationLabel}
                notificationPosition={args.notificationPosition}
                style={args.style}
                toastLabel={args.toastLabel}
                toastPosition={args.toastPosition}
            >
                <Story />
            </ToasterStoryLayout>
        ),
    ],
    parameters: {
        layout: 'padded',
        docs: {
            page: ToasterDocsPage,
            description: {
                component: 'Wrap the application once in ToasterProvider inside its theme scope. It mounts both channels so components can use useToast and useNotification. Toasts last 5 seconds at bottom-right; notifications persist at top-right until dismissed.',
            },
            source: { type: 'dynamic', transform: createToasterSource },
        },
    },
} satisfies Meta<ToasterStoryArgs & ToasterProviderProps>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
