import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/DrawerUsage.source.txt?raw'
import { md } from '@stories/_shared/utils/markdown'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                              | Required    | Type      | Notes                                                                                                                    |
| --------------------------------------------- | ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| \`aria-label\` or \`aria-labelledby\` on \`Drawer\` | No          | \`string\`  | Name the drawer for screen readers. Add a visible title in \`Drawer.Header\` and reference its \`id\` via \`aria-labelledby\`. |
| \`aria-label\` on \`Drawer.Body as="nav"\`        | Recommended | \`string\`  | Provide an accessible name for the navigation region.                                                                    |
| \`aria-expanded\` / \`aria-controls\`             | Auto        | \`boolean\` | Set automatically by \`Drawer.SectionItem\`.                                                                               |
| \`aria-disabled\` on \`Drawer.NavItem\`           | Auto        | \`boolean\` | Set when \`disabled\` is true; keeps the item discoverable.                                                                |

- Portal drawers are always modal and trap focus while open.
- Pressing \`Escape\` or clicking the backdrop closes a portal drawer.
- In \`inline\` mode the collapsed panel is hidden with \`aria-hidden\` and \`inert\`.
- In \`mini\` mode the panel stays visible and accessible when collapsed.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| Drawer.Header | Header layout accepting a title and application-owned close controls. |
| Drawer.Body | Main section, optionally a named navigation landmark. |
| Drawer.Footer | Action row. |
| Drawer.Section | Content group with an optional title. |
| Drawer.NavItem | Native destination link with icons, active and disabled states. |
| Drawer.ActionItem | Named button action with icons. |
| Drawer.SectionItem | Expandable group of child items with controlled or initial expanded state. |
`

/**
 * Renders drawer documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <DrawerDocsPage />
 */
const DrawerDocsPage = () => (
    <>
        <Title />
        <Description />
        <Source
            code={usageSource}
            language={'tsx'}
        />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default DrawerDocsPage
