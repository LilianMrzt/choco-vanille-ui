import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders dropdown menu documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <DropdownMenuDocsPage />
 */
const DropdownMenuDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`DropdownMenu.Trigger\` | Yes | React element | Supply an accessible trigger. |
| \`DropdownMenu.Content\` | Yes | Compound slot | Contains menu items. |
| \`disabled\` | No | \`boolean\` | Prevents activating the item. |

Use Enter or Space to open, arrow keys to navigate, and Escape to close.
The popup is portalled to the document and does not inherit a locally scoped theme.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default DropdownMenuDocsPage
