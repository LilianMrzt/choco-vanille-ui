import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Callout } from '@/components/feedback/callout'
import type { CalloutRole, CalloutVariant } from '@components/feedback/callout'
import { md } from '@stories/utils/markdown'

const VARIANTS: CalloutVariant[] = ['info', 'success', 'warning', 'error']

const ROLES: CalloutRole[] = ['alert', 'status', 'none']

type CalloutPlaygroundArgs = {
    variant?: CalloutVariant
    role?: CalloutRole
    icon?: string
    title?: string
    description?: string
    showIcon?: boolean
    showTitle?: boolean
    showDescription?: boolean
    className?: string
}

const meta: Meta<CalloutPlaygroundArgs> = {
    title: 'Feedback/Callout',
    component: Callout,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: md /* language=markdown */ `<!--suppress HtmlUnknownAttribute -->
A compound callout component for surfacing contextual messages such as feedback, warnings, or errors.

It supports four intent variants — \`info\`, \`success\`, \`warning\`, and \`error\` — each with a default icon and color scheme.
Compose with \`Callout.Icon\`, \`Callout.Title\`, and \`Callout.Description\` when you need full control over the content.

**Usage**

\`\`\`tsx
// Convenience API
<Callout
  variant="warning"
  title="Heads up"
  description="This action cannot be undone."
/>

// Compound API
<Callout variant="error">
  <Callout.Icon icon="lucide:circle-x" />
  <Callout.Title>Error</Callout.Title>
  <Callout.Description>Something went wrong.</Callout.Description>
</Callout>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`role\` on root | No | \`alert\` \| \`status\` \| \`none\` | Defaults to \`alert\`. Use \`status\` for non-critical updates. |
| \`aria-label\` on \`Callout.Icon\` | No | \`string\` | Provide when the icon conveys meaning on its own. |

- Keep the message concise; the callout is announced as a live region because of \`role="alert"\` by default.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Callout\` | Root container that sets the intent variant and provides context. |
| \`Callout.Icon\` | Leading icon. Defaults to the variant icon when used inside \`Callout\`. |
| \`Callout.Title\` | Bold title text. |
| \`Callout.Description\` | Secondary description text. |
                `,
            },
        },
    },
    argTypes: {
        variant: { control: 'select', options: VARIANTS, table: { category: 'Callout' } },
        role: { control: 'select', options: ROLES, table: { category: 'Callout' } },
        icon: { control: 'text', table: { category: 'Callout.Icon' } },
        title: { control: 'text', table: { category: 'Callout.Title' } },
        description: { control: 'text', table: { category: 'Callout.Description' } },
        showIcon: { control: 'boolean', table: { category: 'Callout.Icon' } },
        showTitle: { control: 'boolean', table: { category: 'Callout.Title' } },
        showDescription: { control: 'boolean', table: { category: 'Callout.Description' } },
        className: { control: 'text', table: { category: 'Callout' } },
    },
    args: {
        variant: 'info',
        role: 'alert',
        icon: 'lucide:info',
        title: 'Did you know?',
        description: 'Callouts are great for inline status messages.',
        showIcon: true,
        showTitle: true,
        showDescription: true,
    },
}

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
        },
    },
    render: ({
        variant,
        role,
        icon,
        title,
        description,
        showIcon,
        showTitle,
        showDescription,
        className,
    }) => (
        <Callout
            variant={variant}
            role={role}
            icon={showIcon ? icon : undefined}
            title={showTitle ? title : undefined}
            description={showDescription ? description : undefined}
            className={className}
        />
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('alert')).toBeInTheDocument()
    },
}
