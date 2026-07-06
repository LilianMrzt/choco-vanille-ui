import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import { Toast } from '@/components/feedback/toast'
import type { ToastRole, ToastVariant } from '@components/feedback/toast'
import { md } from '@stories/utils/markdown'

const VARIANTS: ToastVariant[] = ['info', 'success', 'warning', 'error']

const ROLES: ToastRole[] = ['alert', 'status', 'none']

type ToastPlaygroundArgs = {
    variant?: ToastVariant
    role?: ToastRole
    icon?: string
    title?: string
    description?: string
    closeLabel?: string
    showTitle?: boolean
    showDescription?: boolean
    showClose?: boolean
    className?: string
}

const meta: Meta<ToastPlaygroundArgs> = {
    title: 'Feedback/Toast',
    component: Toast,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: md /* language=markdown */ `
A toast component for surfacing brief, non-blocking notifications.

It supports four intent variants — \`info\`, \`success\`, \`warning\`, and \`error\` — each with a default icon and color scheme. Render it with the convenient \`title\` / \`description\` / \`onClose\` props, or compose it manually with \`Toast.Icon\`, \`Toast.Title\`, \`Toast.Description\`, and \`Toast.Close\`.

**Usage**

~~~tsx
// Convenient prop-based API
<Toast
  variant="success"
  title="Changes saved"
  description="Your profile has been updated."
  onClose={() => dismiss()}
/>

// Compound composition
<Toast variant="warning">
  <Toast.Icon icon="mdi:alert-outline" />
  <Toast.Title>Heads up</Toast.Title>
  <Toast.Description>Your session will expire soon.</Toast.Description>
  <Toast.Close aria-label="Dismiss warning" onClick={() => dismiss()} />
</Toast>
~~~

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`role\` | No | \`alert\` \| \`status\` \| \`none\` | Defaults to \`status\`. Use \`alert\` for time-sensitive or error messages that need immediate attention. |
| \`title\` | No | \`React.ReactNode\` | Provides a bold, accessible heading for the toast content. |
| \`description\` | No | \`React.ReactNode\` | Main message content. Keep it concise so screen-reader users receive the full context. |
| \`closeLabel\` | No | \`string\` | Accessible label for the close button. Defaults to \`"Close notification"\`. |
| \`onClose\` | No | \`() => void\` | Renders the close button. Without it, users have no keyboard-accessible way to dismiss the toast. |
| \`aria-*\` | No | — | All native \`<div>\` ARIA attributes are forwarded to the root element. |

- The root element is a \`<div>\` with a live-region \`role\` (\`status\` or \`alert\`), so screen readers announce the toast when it appears.
- When \`onClose\` is provided, a native \`<button>\` is rendered and is keyboard operable with \`Space\` / \`Enter\`.
- Avoid using only an icon without a title or description; provide meaningful text content for the live region.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Toast\` | Root container that sets the variant context and live-region role. |
| \`Toast.Icon\` | Optional icon. Defaults to the variant icon when omitted in prop mode. |
| \`Toast.Title\` | Bold title rendered above the description. |
| \`Toast.Description\` | Main message content. |
| \`Toast.Close\` | Dismiss button. Requires an \`aria-label\` and an \`onClick\` handler. |
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: VARIANTS,
            table: { category: 'Toast' },
        },
        role: {
            control: 'select',
            options: ROLES,
            table: { category: 'Toast' },
        },
        className: {
            control: 'text',
            table: { category: 'Toast' },
        },
        icon: {
            control: 'text',
            table: { category: 'Toast.Icon' },
        },
        title: {
            control: 'text',
            table: { category: 'Toast.Title' },
        },
        showTitle: {
            control: 'boolean',
            table: { category: 'Toast.Title' },
        },
        description: {
            control: 'text',
            table: { category: 'Toast.Description' },
        },
        showDescription: {
            control: 'boolean',
            table: { category: 'Toast.Description' },
        },
        closeLabel: {
            control: 'text',
            table: { category: 'Toast.Close' },
        },
        showClose: {
            control: 'boolean',
            table: { category: 'Toast.Close' },
        },
    },
    args: {
        variant: 'info',
        role: 'status',
        title: 'Did you know?',
        description: 'Toasts are great for lightweight status updates.',
        closeLabel: 'Close notification',
        showTitle: true,
        showDescription: true,
        showClose: true,
    },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Interactive playground — use the Controls panel to experiment with every available prop, grouped by sub-component.',
            },
        },
    },
    render: ({
        variant,
        role,
        icon,
        title,
        description,
        closeLabel,
        showTitle,
        showDescription,
        showClose,
        className,
    }) => (
        <Toast
            variant={variant}
            role={role}
            icon={icon}
            title={showTitle ? title : undefined}
            description={showDescription ? description : undefined}
            closeLabel={closeLabel}
            onClose={showClose ? () => {} : undefined}
            className={className}
        />
    ),
    play: async ({ canvasElement, args }) => {
        const canvas = within(canvasElement)
        const role = args.role === 'none' ? 'generic' : args.role
        await expect(canvas.getByRole(role as string)).toBeInTheDocument()

        if (args.showClose) {
            await expect(
                canvas.getByRole('button', { name: args.closeLabel })
            ).toBeInTheDocument()
        }
    },
}
