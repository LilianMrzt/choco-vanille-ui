import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/ContextMenuUsage.source.txt?raw'
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
| \`ContextMenu.Trigger\` | Yes | React element | Right click, long press, or use the context menu key. |
| \`ContextMenu.Content\` | Yes | Compound slot | Contains menu items. |
| \`disabled\` | No | \`boolean\` | Prevents opening. |

Use the context menu key or Shift+F10 to open; arrow keys navigate and Escape closes.
The popup is portalled to the document and does not inherit a locally scoped theme.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| ContextMenu.Trigger | Focusable context-menu target. |
| ContextMenu.Content | Positioned menu surface. |
| ContextMenu.Item | Named action with optional icons, shortcut, active and destructive styling. |
| ContextMenu.Group / Label | Group and accessible group heading. |
| ContextMenu.CheckboxItem | Independently checked menu option. |
| ContextMenu.RadioGroup / RadioItem | Coordinated single-choice menu options. |
| ContextMenu.Separator | Decorative group divider. |
| ContextMenu.Shortcut | Keyboard-shortcut annotation. |
| ContextMenu.Sub / SubTrigger / SubContent | Nested menu, named trigger and positioned surface. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ContextMenuDocsPage
