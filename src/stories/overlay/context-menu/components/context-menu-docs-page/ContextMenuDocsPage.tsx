import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders context menu documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <ContextMenuDocsPage />
 */
const ContextMenuDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`ContextMenu.Trigger\` | Yes | React element | Right click, long press, or use the context menu key. |
| \`ContextMenu.Content\` | Yes | Compound slot | Contains menu items. |
| \`disabled\` | No | \`boolean\` | Prevents opening. |

Use the context menu key or Shift+F10 to open; arrow keys navigate and Escape closes.
The popup is portalled to the document and does not inherit a locally scoped theme.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ContextMenuDocsPage
