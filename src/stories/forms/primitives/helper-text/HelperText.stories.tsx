import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'

import { HelperText } from '@components/forms/primitives/helper-text'
import HelperTextDocsPage from '@stories/forms/primitives/helper-text/components/helper-text-docs-page/HelperTextDocsPage'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/primitives/helper-text/constants'
import { createHelperTextSource } from '@stories/forms/primitives/helper-text/utils/createHelperTextSource.utils'

const meta = {
    title: 'Forms/Primitives/HelperText',
    component: HelperText,
    parameters: {
        docs: {
            page: HelperTextDocsPage,
            source: { type: 'dynamic', transform: createHelperTextSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
    tags: ['autodocs'],
} satisfies Meta<typeof HelperText>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Error: Story = {
    args: { children: 'Enter a valid email address.', hasError: true },
}
