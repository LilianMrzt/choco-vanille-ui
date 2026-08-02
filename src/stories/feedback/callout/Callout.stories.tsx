import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, within } from 'storybook/test'

import { Callout } from '@/components/feedback/callout'
import type { CalloutRole, CalloutVariant } from '@components/feedback/callout'
import { IconRegistry } from '@constants/icons'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VARIANTS: CalloutVariant[] = ['info', 'success', 'warning', 'error']

const ROLES: CalloutRole[] = ['alert', 'status', undefined]

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`role\` on root | No | \`alert\` \| \`status\` | Defaults to \`status\`. Use \`alert\` only for urgent messages. |
| \`aria-label\` on \`Callout.Icon\` | No | \`string\` | Provide when the icon conveys meaning on its own. |

- The callout is a polite live region by default.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Callout\` | Root container that provides context. |
| \`Callout.Icon\` | Leading icon. |
| \`Callout.Title\` | Bold title text. |
| \`Callout.Description\` | Secondary description text. |
`

const CalloutDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

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
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A compound callout component for surfacing contextual messages such as feedback, warnings, or errors.

It supports four intent variants — \`info\`, \`success\`, \`warning\`, and \`error\` — each with a default icon and color scheme.
Compose with \`Callout.Icon\`, \`Callout.Title\`, and \`Callout.Description\` when you need full control over the content.

**Usage**

~~~tsx
// Convenience API
<Callout
    variant="warning"
    title="Heads up"
    description="This action cannot be undone."
/>

// Compound API
<Callout variant="error">
    <Callout.Icon icon={IconRegistry.error} />
    <Callout.Title>Error</Callout.Title>
    <Callout.Description>Something went wrong.</Callout.Description>
</Callout>
~~~
                `,
            },
            page: CalloutDocsPage,
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: VARIANTS,
            table: { category: 'Callout' },
        },
        role: { control: 'select', options: ROLES, table: { category: 'Callout' } },
        icon: { control: 'text', table: { category: 'Compound: Icon' } },
        title: { control: 'text', table: { category: 'Compound: Title' } },
        description: {
            control: 'text',
            table: { category: 'Compound: Description' },
        },
        showIcon: { control: 'boolean', table: { category: 'Compound: Icon' } },
        showTitle: { control: 'boolean', table: { category: 'Compound: Title' } },
        showDescription: {
            control: 'boolean',
            table: { category: 'Compound: Description' },
        },
        className: { control: 'text', table: { category: 'Callout' } },
    },
    args: {
        variant: 'info',
        role: 'status',
        icon: IconRegistry.info,
        title: 'Did you know?',
        description: 'Callouts are great for inline status messages.',
        showIcon: true,
        showTitle: true,
        showDescription: true,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to experiment with every available prop.',
            },
            ...storySource(`<Callout variant="info"><Callout.Icon icon="mdi:information-outline" /><Callout.Title>Did you know?</Callout.Title><Callout.Description>Callouts are great for inline status messages.</Callout.Description></Callout>`),
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
            className={className}
        >
            {showIcon && <Callout.Icon icon={icon} />}
            {showTitle && <Callout.Title>{title}</Callout.Title>}
            {showDescription && <Callout.Description>{description}</Callout.Description>}
        </Callout>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('status')).toBeInTheDocument()
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            description: { story: 'All available callout intent variants.' },
            ...storySource(`<Callout variant="info" title="Info" description="Information." /><Callout variant="success" title="Success" description="Completed." /><Callout variant="warning" title="Warning" description="Be careful." /><Callout variant="error" title="Error" description="Something went wrong." />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.75rem', width: '32rem' }}>
            <Callout
                variant={'info'}
                title={'Info'}
                description={'Information.'}
            />
            <Callout
                variant={'success'}
                title={'Success'}
                description={'Completed.'}
            />
            <Callout
                variant={'warning'}
                title={'Warning'}
                description={'Be careful.'}
            />
            <Callout
                variant={'error'}
                title={'Error'}
                description={'Something went wrong.'}
            />
        </div>
    ),
}