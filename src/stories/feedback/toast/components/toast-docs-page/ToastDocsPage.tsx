import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders toast documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <ToastDocsPage />
 */
const ToastDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`role\` | No | \`status \\| alert \\| none\` | Defaults to \`status\`; use \`alert\` for urgent messages. |
| \`closeLabel\` | No | \`string\` | Names the convenience close button. |
| \`Toast.Close aria-label\` | Yes | \`string\` | Names the compound close button. |
| \`onClose\` | No | \`() => void\` | Renders a close button in the convenience API. |

Compound slots include Icon, Title, Description, Actions and Close. A Toast
card does not dismiss itself; attach a handler to the close button.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ToastDocsPage
