import type { Meta, StoryObj } from '@storybook/react-vite'

import { HelperText } from '@components/forms/primitives/helper-text'
import HelperTextDocsPage from '@stories/forms/primitives/helper-text/components/helper-text-docs-page/HelperTextDocsPage'
import source from '@stories/forms/primitives/helper-text/sources/HelperText.source.tsx.txt?raw'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import type { ComponentProps } from 'react'

const meta = {
    title: 'Forms/Primitives/HelperText',
    component: HelperText,
    parameters: {
        docs: {
            page: HelperTextDocsPage,
            source: { type: 'dynamic', transform: createPrimitiveSource<ComponentProps<typeof HelperText>>(source, { hasChildren: true }) },
            description: {
                component: 'Supporting or error text for a form control. Give it an ID and reference it from the control with `aria-describedby`.',
            },
        },
    },
    argTypes: {
        children: { control: 'text' },
        hasError: { control: 'boolean' },
        role: { control: false },
        'aria-live': { control: 'select', options: ['off', 'polite', 'assertive'] },
    },
    args: { children: 'Use your work email.' },
    tags: ['autodocs'],
} satisfies Meta<typeof HelperText>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Error: Story = {
    args: { children: 'Enter a valid email address.', hasError: true },
}
