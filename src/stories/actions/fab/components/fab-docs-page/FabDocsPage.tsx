import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders Fab documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <FabDocsPage />
 */
const FabDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` | For icon-only buttons | \`string\` | Provides an accessible name when there is no visible label. |

Choose a position that does not obscure focusable content. The native button
supports keyboard operation, and its entrance animation respects reduced motion.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default FabDocsPage
