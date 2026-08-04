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

import { Button } from '@components/actions/button'
import type { ButtonColor, ButtonVariant } from '@components/actions/button/types/Button.types.ts'
import { Toast, ToastProvider } from '@/components/feedback/toast'
import type { ToastRole, ToastVariant } from '@components/feedback/toast'
import { useNotification, useToast } from '@hooks'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

const VARIANTS: ToastVariant[] = ['info', 'success', 'warning', 'error']

const ROLES: ToastRole[] = ['alert', 'status', 'none']

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| \`role\` | No | \`alert\` \| \`status\` \| \`none\` | Defaults to \`status\`; use \`alert\` for urgent messages. |
| \`closeLabel\` | No | \`string\` | Accessible label for the close button. |
| \`onClose\` | No | \`() => void\` | Renders a keyboard-accessible close button. |

**Sub-components**

| Sub-component | Description |
|---|---|
| \`Toast\` | Root live-region container. |
| \`Toast.Icon\` | Optional icon. |
| \`Toast.Title\` | Toast heading. |
| \`Toast.Description\` | Main message. |
| \`Toast.Actions\` | Action container. |
| \`Toast.Close\` | Dismiss button. |
`

const ToastDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

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
    showActions?: boolean
    actionLabel?: string
    actionVariant?: ButtonVariant
    actionColor?: ButtonColor
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
A toast component for surfacing brief, non-blocking notifications. Mount
\`ToastProvider\` once near the application root to activate the top-right toast
and bottom-right persistent notification viewports. Use \`useToast\` for concise
toasts and \`useNotification\` for persistent, composable notifications.

It supports four intent variants — \`info\`, \`success\`, \`warning\`, and \`error\` — each with a default icon and color scheme. Render it with the convenient \`title\` / \`description\` / \`onClose\` props, or compose it manually with \`Toast.Icon\`, \`Toast.Title\`, \`Toast.Description\`, \`Toast.Actions\`, and \`Toast.Close\`.

**Usage**

~~~tsx
// Mount once near the application root.
<ToastProvider />

// Display a transient top-right toast.
const SaveButton = () => {
  const { showSuccess } = useToast()
  return (
    <Button
      label="Save"
      onClick={() =>
        showSuccess({
          title: "Changes saved",
          description: "Your profile has been updated.",
        })
      }
    />
  )
}

// Display a persistent bottom-right notification.
const UpdateButton = () => {
  const { show } = useNotification()
  return (
    <Button
      label="Show update"
      onClick={() =>
        show({
          variant: "info",
          title: "New version available",
          description: "Reload when you are ready.",
        })
      }
    />
  )
}

// Compound composition
<Toast variant="warning">
  <Toast.Icon icon="mdi:alert-outline" />
  <Toast.Title>Heads up</Toast.Title>
  <Toast.Description>Your session will expire soon.</Toast.Description>
  <Toast.Actions>
    <Button size="sm" label="Extend" onClick={() => extendSession()} />
  </Toast.Actions>
  <Toast.Close aria-label="Dismiss warning" onClick={() => dismiss()} />
</Toast>
~~~
        `,
            },
            page: ToastDocsPage,
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
            table: { category: 'Compound: Icon' },
        },
        title: {
            control: 'text',
            table: { category: 'Compound: Title' },
        },
        showTitle: {
            control: 'boolean',
            table: { category: 'Toast.Title' },
        },
        description: {
            control: 'text',
            table: { category: 'Compound: Description' },
        },
        showDescription: {
            control: 'boolean',
            table: { category: 'Compound: Description' },
        },
        closeLabel: {
            control: 'text',
            table: { category: 'Compound: Close' },
        },
        showClose: {
            control: 'boolean',
            table: { category: 'Compound: Close' },
        },
        actionLabel: {
            control: 'text',
            table: { category: 'Compound: Actions' },
        },
        showActions: {
            control: 'boolean',
            table: { category: 'Compound: Actions' },
        },
        actionVariant: {
            control: 'select',
            options: ['contained', 'outlined', 'ghost'],
            table: { category: 'Compound: Actions' },
        },
        actionColor: {
            control: 'select',
            options: ['primary', 'secondary', 'destructive', 'success', 'warning', 'info'],
            table: { category: 'Compound: Actions' },
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
        showActions: false,
        actionLabel: 'Learn more',
        actionVariant: 'ghost',
        actionColor: 'primary',
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
            ...storySource(`
<Toast variant="info">
  <Toast.Title>Did you know?</Toast.Title>
  <Toast.Description>
    Toasts are great for lightweight status updates.
  </Toast.Description>
  <Toast.Close aria-label="Close notification" />
</Toast>`),
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
        showActions,
        actionLabel,
        actionVariant,
        actionColor,
        className,
    }) => (
        <Toast
            variant={variant}
            role={role}
            className={className}
        >
            {icon && <Toast.Icon icon={icon} />}
            {showTitle && <Toast.Title>{title}</Toast.Title>}
            {showDescription && <Toast.Description>{description}</Toast.Description>}
            {showActions && (
                <Toast.Actions>
                    <Button
                        size={'sm'}
                        variant={actionVariant}
                        color={actionColor}
                        label={actionLabel ?? 'Action'}
                    />
                </Toast.Actions>
            )}
            {showClose && closeLabel && (
                <Toast.Close
                    aria-label={closeLabel}
                    onClick={() => {}}
                />
            )}
        </Toast>
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

        if (args.showActions) {
            await expect(
                canvas.getByRole('button', { name: args.actionLabel })
            ).toBeInTheDocument()
        }
    },
}

export const Variants: Story = {
    parameters: {
        docs: {
            description: { story: 'All available toast intent variants.' },
            ...storySource(`
<Toast variant="info" title="Info" description="Information." />
<Toast variant="success" title="Success" description="Completed." />
<Toast variant="warning" title="Warning" description="Be careful." />
<Toast variant="error" title="Error" description="Something went wrong." />`),
        },
    },
    render: () => (
        <div style={{ display: 'grid', gap: '0.75rem', width: '32rem' }}>
            <Toast
                variant={'info'}
                title={'Info'}
                description={'Information.'}
            />
            <Toast
                variant={'success'}
                title={'Success'}
                description={'Completed.'}
            />
            <Toast
                variant={'warning'}
                title={'Warning'}
                description={'Be careful.'}
            />
            <Toast
                variant={'error'}
                title={'Error'}
                description={'Something went wrong.'}
            />
        </div>
    ),
}

const ToastTriggers = () => {
    const { showSuccess } = useToast()
    const { show: showNotification } = useNotification()

    return (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
                label={'Show toast'}
                onClick={() => {
                    showSuccess({
                        title: 'Changes saved',
                        description: 'Your profile has been updated.',
                    })
                }}
            />
            <Button
                label={'Show notification'}
                onClick={() => {
                    showNotification({
                        variant: 'info',
                        title: 'New version available',
                        description: 'Reload when you are ready.',
                    })
                }}
            />
        </div>
    )
}

export const Triggers: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Use the two channels independently: toasts are transient, while notifications stay visible until dismissed.',
            },
            ...storySource(`
const Example = () => {
  const { showSuccess } = useToast()
  const { show: showNotification } = useNotification()

  return (
    <>
      <ToastProvider />
      <Button
        label="Show toast"
        onClick={() =>
          showSuccess({
            title: "Changes saved",
            description: "Your profile has been updated.",
          })
        }
      />
      <Button
        label="Show notification"
        onClick={() =>
          showNotification({
            variant: "info",
            title: "New version available",
            description: "Reload when you are ready.",
          })
        }
      />
    </>
  )
}`),
        },
    },
    render: () => (
        <>
            <ToastProvider />
            <ToastTriggers />
        </>
    ),
}
