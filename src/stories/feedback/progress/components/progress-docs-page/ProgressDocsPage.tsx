import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders progress documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <ProgressDocsPage />
 */
const ProgressDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`value\` | Yes | \`number\` | Clamped to 0–100. |
| \`label\`, \`aria-label\`, \`aria-labelledby\` | One required | \`string\` | Names the progressbar. |
| \`quantityLabel\` | No | \`string \\| true\` | Displays a custom quantity or percentage. |

Both variants expose progress values on a \`progressbar\` role.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ProgressDocsPage
