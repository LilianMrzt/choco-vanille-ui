import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders hover card documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <HoverCardDocsPage />
 */
const HoverCardDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`HoverCard.Trigger\` child | Yes | Focusable element | Opens the preview on hover or focus. |
| \`open\` / \`defaultOpen\` | No | \`boolean\` | Controlled or initial uncontrolled state. |
| Trigger \`delay\` | No | \`number\` | Opening delay in milliseconds; defaults to \`0\`. |
| Trigger \`closeDelay\` | No | \`number\` | Closing delay in milliseconds; defaults to \`300\`. |

Use the preview for supplementary information rather than content required to
complete an action. The content is portaled to the document and does not
automatically inherit a locally scoped theme.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default HoverCardDocsPage
