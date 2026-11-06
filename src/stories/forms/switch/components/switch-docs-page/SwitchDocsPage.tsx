import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders switch documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <SwitchDocsPage />
 */
const SwitchDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`label\` | Conditional | \`string\` | Provides an accessible name. |
| \`aria-label\` or \`aria-labelledby\` | Without a label | \`string\` | Supplies an accessible name. |
| \`error\` | No | \`string\` | Describes the invalid state. |

Use Space to change the focused switch. Provide the accessible label in the
language of the surrounding interface.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default SwitchDocsPage
