import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders popover documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <PopoverDocsPage />
 */
const PopoverDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`Popover.Trigger\` child | Yes | Focusable element | Opens the popover. |
| \`Popover.Content aria-label\` | No | \`string\` | Names the dialog; defaults to \`Popover\`. |
| \`open\` / \`defaultOpen\` | No | \`boolean\` | Controlled or initial uncontrolled state. |
| \`modal\` | No | \`boolean \\| "trap-focus"\` | Defaults to \`false\`. |
| \`closeOnClick\` | No | \`boolean\` | Defaults to \`true\` for items. |

Escape closes the popup. For modal focus trapping Base UI requires a close
control inside the popup; an enabled item with \`closeOnClick\` provides one.
The popup uses a document portal, so locally scoped themes may not follow it.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default PopoverDocsPage
