import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormStoryFrame } from '@stories/forms/utils/FormStoryFrame.utils'

import { FormLabel } from '@components/forms/primitives/form-label'
import FormLabelDocsPage from '@stories/forms/primitives/form-label/components/form-label-docs-page/FormLabelDocsPage'
import { ARG_TYPES, DEFAULT_ARGS, DESCRIPTION } from '@stories/forms/primitives/form-label/constants'
import { createFormLabelSource } from '@stories/forms/primitives/form-label/utils/createFormLabelSource.utils'

const meta = {
    title: 'Forms/Primitives/FormLabel',
    component: FormLabel,
    parameters: {
        docs: {
            page: FormLabelDocsPage,
            source: { type: 'dynamic', transform: createFormLabelSource },
            description: {
                component: DESCRIPTION,
            },
        },
    },
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
    decorators: [FormStoryFrame],
    tags: ['autodocs'],
} satisfies Meta<typeof FormLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = { args: { disabled: true } }
