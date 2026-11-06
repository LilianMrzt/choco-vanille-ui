import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders button documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <ButtonDocsPage />
 */
const ButtonDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`label\` | Yes | \`string\` | Visible accessible name of the action or link. |
| \`href\` | No | \`string\` | Renders an anchor for navigation. |
| \`disabled\` | No | \`boolean\` | Disables a native button, not a link. |

Use IconButton for an action with no visible text. Button icons are decorative.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ButtonDocsPage
