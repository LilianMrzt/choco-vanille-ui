import type { Meta, StoryObj } from '@storybook/react-vite'

import { Form } from '@/components/forms/primitives/form'
import FormDocsPage from '@stories/forms/primitives/form/components/form-docs-page/FormDocsPage'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/primitives/form/constants'
import FormPlayground from '@stories/forms/primitives/form/components/form-playground/FormPlayground'
import FormPlaygroundPlay from '@stories/forms/primitives/form/utils/FormPlaygroundPlay.utils'
import { FormFrame } from '@stories/forms/primitives/form/utils/FormFrame.utils'
import { createFormSource } from '@stories/forms/primitives/form/utils/createFormSource.utils'

const meta = {
    title: 'Forms/Primitives/Form',
    component: Form,
    parameters: {
        layout: 'centered',
        docs: {
            page: FormDocsPage,
            description: {
                component: DESCRIPTION,
            },
            source: { type: 'dynamic', transform: createFormSource }
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [
        FormFrame,
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
