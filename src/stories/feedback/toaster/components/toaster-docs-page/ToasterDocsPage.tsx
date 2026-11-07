import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Documents viewport configuration and accessible notification usage.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The Toaster documentation page.
 * @example
 * <ToasterDocsPage />
 */
const ToasterDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`toastLabel\` | No | \`string\` | Accessible transient region name; defaults to \`Toasts\`. |
| \`notificationLabel\` | No | \`string\` | Accessible persistent region name; defaults to \`Notifications\`. |
| Notification hook \`closeLabel\` | No | \`string\` | Close button name; defaults to \`Close notification\`. Toasts do not have close buttons. |
| Hook \`actions\` | No | \`ReactNode\` | Provide named buttons or links for notification actions. |

Messages are announced politely by the viewport, without a second live region
on each card. Status must be understandable from the text, not just its color.
Keyboard users can use Alt+T to focus toasts and Alt+N to focus persistent
notifications. Escape collapses the stack. Notifications have a close button;
both channels support swipe dismissal and the hooks' dismiss method.
Timers pause while the viewport is hovered, focused, or the document is hidden.

Notifications appear at top-right and remain until dismissed by default.
Their actions align to flex-end. Toasts appear at bottom-right, last 5 seconds
by default and have no close button. Each channel shows up to three stacked
messages; additional messages remain in Sonner's queue. Collapsed cards retain
their content with a 16px stack offset; hovering or focusing expands the stack
with an 8px gap.

Wrap the application once in ToasterProvider inside the desired theme scope,
outside transformed or clipping containers. It mounts both channels; descendants
can call useToast and useNotification. Toaster remains available for manual
mounting instead of the provider; do not mount both.
On mobile, cards fit the viewport with a 16px inset.
NotificationCard is the standalone compound; use its story to compose
custom titles, descriptions, icons, actions and close buttons.

This story's decorator mounts ToasterProvider at the preview document level. Messages
cover the preview or Docs screen rather than being clipped to the canvas.
Use Show simple toast for a title-only message without description or actions.
Notification actions use compact ghost buttons.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ToasterDocsPage
