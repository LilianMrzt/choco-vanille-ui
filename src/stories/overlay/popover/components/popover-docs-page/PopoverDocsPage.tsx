import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/PopoverUsage.source.txt?raw'
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
| \`Popover.Trigger\` child | Yes | Focusable element | Opens the popover. |
| \`Popover.Content aria-label\` | No | \`string\` | Names the dialog; defaults to \`Popover\`. |
| \`open\` / \`defaultOpen\` | No | \`boolean\` | Controlled or initial uncontrolled state. |
| \`modal\` | No | \`boolean \\| "trap-focus"\` | Defaults to \`false\`. |
| \`closeOnClick\` | No | \`boolean\` | Defaults to \`true\` for items. |

Escape closes the popup. For modal focus trapping Base UI requires a close
control inside the popup; an enabled item with \`closeOnClick\` provides one.
The popup uses a document portal, so locally scoped themes may not follow it.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| Popover.Trigger | Accessible element opening the popup. |
| Popover.Content | Positioned dialog surface with width, padding and accessible-name options. |
| Popover.Item | Named action with optional icons, shortcut and state styling; can close the popup on activation. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default PopoverDocsPage
