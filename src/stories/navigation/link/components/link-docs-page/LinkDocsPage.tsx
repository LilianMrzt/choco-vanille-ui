import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders link documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <LinkDocsPage />
 */
const LinkDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`label\` | Yes | \`string\` | Visible text and default accessible name. |
| \`href\` | No | \`string\` | Native destination; defaults to \`#\`. |
| \`aria-label\` | No | \`string\` | Overrides the accessible name when needed. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default LinkDocsPage
