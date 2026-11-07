import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/DropdownMenuUsage.source.txt?raw'
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
| \`DropdownMenu.Trigger\` | Yes | React element | Supply an accessible trigger. |
| \`DropdownMenu.Content\` | Yes | Compound slot | Contains menu items. |
| \`disabled\` | No | \`boolean\` | Prevents activating the item. |

Use Enter or Space to open, arrow keys to navigate, and Escape to close.
The popup is portalled to the document and does not inherit a locally scoped theme.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| DropdownMenu.Trigger | Accessible element opening the menu. |
| DropdownMenu.Content | Positioned menu surface. |
| DropdownMenu.Item | Named action with optional icons, shortcut, active and destructive styling. |
| DropdownMenu.Group / Label | Group and accessible group heading. |
| DropdownMenu.CheckboxItem | Independently checked menu option. |
| DropdownMenu.RadioGroup / RadioItem | Coordinated single-choice menu options. |
| DropdownMenu.Separator | Decorative group divider. |
| DropdownMenu.Shortcut | Keyboard-shortcut annotation. |
| DropdownMenu.Sub / SubTrigger / SubContent | Nested menu, named trigger and positioned surface. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default DropdownMenuDocsPage
