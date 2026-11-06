import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, fn, within } from 'storybook/test'

import { Callout } from '@/components/feedback/callout'
import type { CalloutRole, CalloutVariant } from '@components/feedback/callout'
import type { IconComponent } from '@components/foundation/icon'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

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
| \`Callout.Action\` | Icon-only \`IconButton\` pinned to the top-right corner. Requires \`aria-label\`. |
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
    icon?: IconComponent
    title?: string
    description?: string
    showIcon?: boolean
    showTitle?: boolean
    showDescription?: boolean
    showAction?: boolean
    actionLabel?: string
    onActionClick?: () => void
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
    <Callout.Icon icon={CircleErrorIcon} />
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
        showAction: { control: 'boolean', table: { category: 'Compound: Action' } },
        actionLabel: { control: 'text', table: { category: 'Compound: Action' } },
        onActionClick: { table: { category: 'Compound: Action' } },
        className: { control: 'text', table: { category: 'Callout' } },
    },
    args: {
        variant: 'info',
        role: 'status',
        icon: InfoIcon,
        title: 'Did you know?',
        description: 'Callouts are great for inline status messages.',
        showIcon: true,
        showTitle: true,
        showDescription: true,
        showAction: true,
        actionLabel: 'Dismiss',
        onActionClick: fn(),
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
        showAction,
        actionLabel,
        onActionClick,
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
            {showAction && (
                <Callout.Action
                    aria-label={actionLabel ?? 'Dismiss'}
                    icon={CloseIcon}
                    onClick={onActionClick}
                />
            )}
        </Callout>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByRole('status')).toBeInTheDocument()
    },
}

const DismissibleCallout = () => {
    const [isVisible, setIsVisible] = useState(true)

    if (!isVisible) {
        return (
            <button
                type={'button'}
                onClick={() => setIsVisible(true)}
            >
                Show callout
            </button>
        )
    }

    return (
        <Callout
            variant={'success'}
            title={'Changes saved'}
            description={'Your trip details were updated.'}
            style={{ width: '32rem' }}
        >
            <Callout.Action
                aria-label={'Dismiss'}
                icon={CloseIcon}
                onClick={() => setIsVisible(false)}
            />
        </Callout>
    )
}

export const WithAction: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Use `Callout.Action` to add an icon-only button pinned to the top-right corner, e.g. to dismiss the callout. It requires an `aria-label`.',
            },
            ...storySource(`<Callout variant="success" title="Changes saved" description="Your trip details were updated."><Callout.Action aria-label="Dismiss" icon={CloseIcon} onClick={onDismiss} /></Callout>`),
        },
    },
    render: () => <DismissibleCallout />,
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