import type { Meta, StoryObj } from '@storybook/react-vite'

import type { CssVariableReferenceArgs } from '@stories/docs/css-variables/types'
import { DEFAULT_ARGS, ARG_TYPES } from '@stories/docs/css-variables/constants'
import CssVariableReference from '@stories/docs/css-variables/components/css-variable-reference/CssVariableReference'

const meta = {
    title: 'Docs/CSS Variables',
    tags: ['!autodocs'],
    args: DEFAULT_ARGS,
    argTypes: ARG_TYPES,
    parameters: { layout: 'fullscreen' },
    render: CssVariableReference,
} satisfies Meta<CssVariableReferenceArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Reference: Story = {
    name: 'Variable reference',
}
