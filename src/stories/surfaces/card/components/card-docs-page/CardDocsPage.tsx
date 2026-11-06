import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders the card documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <CardDocsPage />
 */
const CardDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`titleAs\` | No | \`h1\`–\`h6\` | Select a level appropriate for the page outline. |
| \`as\` | No | HTML element | Select a semantic element for the content. |

Name icon-only actions with an accessible label.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default CardDocsPage
