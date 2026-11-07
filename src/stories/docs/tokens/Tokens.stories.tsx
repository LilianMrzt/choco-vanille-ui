import type { Meta, StoryObj } from '@storybook/react-vite'

import type { TokenReferenceArgs } from '@stories/docs/tokens/types'
import { DEFAULT_ARGS, ARG_TYPES } from '@stories/docs/tokens/constants'
import TokenReference from '@stories/docs/tokens/components/token-reference/TokenReference'

const meta = {
    title: 'Docs/Tokens',
    tags: ['!autodocs'],
    args: DEFAULT_ARGS,
    argTypes: ARG_TYPES,
    parameters: { layout: 'fullscreen' },
    render: TokenReference,
} satisfies Meta<TokenReferenceArgs>

export default meta
type Story = StoryObj<typeof meta>

export const AllTokens: Story = {
    name: 'Token reference',
}
