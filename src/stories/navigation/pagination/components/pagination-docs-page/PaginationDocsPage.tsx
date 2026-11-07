import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/PaginationUsage.source.txt?raw'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders pagination documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <PaginationDocsPage />
 */
const PaginationDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Source
            code={usageSource}
            language={'tsx'}
        />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` | Yes | \`string\` | Names the navigation landmark. |
| \`previousLabel\` | Yes | \`string\` | Names the previous-page button. |
| \`nextLabel\` | Yes | \`string\` | Names the next-page button. |
| \`aria-current\` | Automatic | \`page\` | Marks the selected page. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default PaginationDocsPage
