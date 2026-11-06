import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders panel documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <PanelDocsPage />
 */
const PanelDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`title\` on \`Panel.Header\` | Recommended | \`string\` | Supplies the accessible panel title. |
| \`aria-label\` on \`Panel.Content\` | No | \`string\` | Provides an explicit accessible name. |
| \`closeLabel\` on \`Panel.Header\` | No | \`string\` | Localize the default close control name. |

Provide a close control and choose an appropriate title or localized name.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default PanelDocsPage
