import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders collapsible documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <CollapsibleDocsPage />
 */
const CollapsibleDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`label\` | Unless named otherwise | \`string\` | Names the trigger. |
| \`disabled\` | No | \`boolean\` | Disables the trigger. |

The trigger supports keyboard activation and exposes its expanded state.
Supply your own SVG component for InfoIcon in the consumer example.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default CollapsibleDocsPage
