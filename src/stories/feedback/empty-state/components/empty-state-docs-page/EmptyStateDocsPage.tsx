import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders the empty-state documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <EmptyStateDocsPage />
 */
const EmptyStateDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`title\` | Yes | \`ReactNode\` | Rendered as an \`h2\` heading. |
| \`description\` | Yes | \`ReactNode\` | Rendered as a paragraph. |
| \`action\` | No | \`ReactNode\` | Provide an accessible name for interactive actions. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default EmptyStateDocsPage
