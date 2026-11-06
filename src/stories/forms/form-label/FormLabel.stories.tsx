import type { Meta, StoryObj } from '@storybook/react-vite'

import { FormLabel } from '@components/forms/_shared/components/form-label'
import FormLabelDocsPage from '@stories/forms/form-label/components/form-label-docs-page/FormLabelDocsPage'
import source from '@stories/forms/form-label/sources/FormLabel.source.tsx.txt?raw'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import type { ComponentProps } from 'react'

const meta = {
    title: 'Forms/FormLabel',
    component: FormLabel,
    parameters: {
        docs: {
            page: FormLabelDocsPage,
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof FormLabel>>(source, { hasChildren: true }) },
            description: {
                component: 'Selectable form label text. Connect it to a control using `aria-labelledby`; set the required state on the control itself.',
            },
        },
    },
    argTypes: {
        children: { control: 'text' },
        disabled: { control: 'boolean' },
        required: { control: 'boolean' },
    },
    args: { children: 'Email address', required: true },
    tags: ['autodocs'],
} satisfies Meta<typeof FormLabel>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const States: Story = { args: { disabled: true } }
