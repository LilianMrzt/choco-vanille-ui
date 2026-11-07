import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/BreadcrumbsUsage.source.txt?raw'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders breadcrumb documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <BreadcrumbsDocsPage />
 */
const BreadcrumbsDocsPage = (): ReactElement => (
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
| \`Breadcrumbs.Item\` | Yes | Compound slot | Ordered breadcrumb item. |
| \`current\` | No | \`boolean\` | Marks an item current; otherwise the last is current. |
| \`aria-current\` | Automatic | \`page\` | Marks the current item. |
| \`separator\` | No | \`BreadcrumbsSeparator\` | Decorative separator. |

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| Breadcrumbs.Item | Native link with a label, optional decorative icons, and explicit or inferred current-page state. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default BreadcrumbsDocsPage
