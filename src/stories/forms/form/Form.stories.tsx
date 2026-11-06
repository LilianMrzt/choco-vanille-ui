import type { Meta, StoryObj } from '@storybook/react-vite'

import { Form } from '@/components/forms/form'
import FormDocsPage from '@stories/forms/form/components/form-docs-page/FormDocsPage'
import { ARG_TYPES, DEFAULT_ARGS } from '@stories/forms/form/constants'
import FormPlayground from '@stories/forms/form/components/form-playground/FormPlayground'
import FormPlaygroundPlay from '@stories/forms/form/utils/FormPlaygroundPlay.utils'
import type { ComponentProps } from 'react'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import interactiveSource from '@stories/forms/form/sources/FormInteractive.source.tsx.txt?raw'

const meta = {
    title: 'Forms/Form',
    component: Form,
    parameters: {
        layout: 'centered',
        docs: {
            page: FormDocsPage,
            description: {
                component: 'A native form wrapper that forwards attributes, events and its ref. Name the form when it needs to be exposed as a landmark.',
            },
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof Form>>(interactiveSource, { omit: ['onSubmit'] }) }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [
        (Story) => (
            <div style={{ width: '320px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs']
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'A simple sign-in form. Fill the fields and click **Sign in** (or press **Enter**) to trigger the submit handler.',
            }
        },
    },
    render: FormPlayground,
    play: FormPlaygroundPlay,
}
