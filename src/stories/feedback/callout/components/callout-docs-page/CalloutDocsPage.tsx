import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders callout documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <CalloutDocsPage />
 */
const CalloutDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`role\` | No | \`status \\| alert\` | Defaults to \`status\`; use \`alert\` for urgent messages. Explicit \`undefined\` removes the role. |
| \`Callout.Action aria-label\` | Yes | \`string\` | Names the icon-only action. |
| \`Callout.Icon aria-label\` | No | \`string\` | Name an icon that conveys meaning on its own. |

The root supports convenience title and description props or compound slots.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default CalloutDocsPage
