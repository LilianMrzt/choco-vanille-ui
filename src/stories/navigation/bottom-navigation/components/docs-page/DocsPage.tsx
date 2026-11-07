import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/BottomNavigationUsage.source.txt?raw'
import { md } from '@stories/_shared/utils/markdown'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| ---------------- | -------- | ---- | ----- |
| \`aria-label\` | Yes | \`string\` | Names the bottom navigation landmark. |
| \`width\` | Default | \`100%\` | The navigation surface fills its parent width. |
| \`bordered\` | No | \`boolean\` | Adds a theme-colored border to the top edge. Defaults to \`false\`. |
| \`value\` / \`defaultValue\` | No | \`string\` | Controlled or uncontrolled selected item value. |
| \`onValueChange\` | No | \`(value: string) => void\` | Called when an enabled item is selected. |
| \`BottomNavigation.List\` | Yes | Compound slot | Groups the navigation items in a list. |
| \`BottomNavigation.Item\` | Yes | Compound slot | Renders a link or button with an icon and optional label. |
| List \`width\` | No | \`CSSProperties['width']\` | Controls the item row width. Defaults to \`100%\`. |
| List \`maxWidth\` | No | \`CSSProperties['maxWidth']\` | Caps the item row width. Defaults to \`32rem\` and keeps it centered in wider parents. |
| List \`gap\` | No | \`BoxSpace\` | Controls the spacing between navigation items. Defaults to \`xxs\`. |
| \`href\` | Conditional | \`string\` | Renders an item as a native link. |
| \`onClick\` | No | Native mouse handler | Preserves the event and prevents native navigation when \`href\` is present, enabling client-side routers. |
| \`label\` | No | \`string\` | Visible label. Omit it for icon-only items. |
| Item \`aria-label\` / \`aria-labelledby\` | Conditional | \`string\` | Required on icon-only items to provide an accessible name. |
| \`icon\` | Yes | \`IconComponent\` | Decorative icon shown in the navigation item. |
| \`height\` | No | \`CSSProperties['height']\` | Overrides the height of an individual item control. |
| \`aria-current\` | Automatic | \`"page"\` | Applied to the selected item. |
| \`disabled\` | No | \`boolean\` | Removes an item from interaction while keeping it visible. |

**Sub-components**

| Sub-component           | Description                                  |
| ----------------------- | -------------------------------------------- |
| \`BottomNavigation.List\` | Layout container for the items.              |
| \`BottomNavigation.Item\` | Link or button representing one destination. |
`

/**
 * Renders the documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation.
 * @example
 * <BottomNavigationDocsPage />
 */
const BottomNavigationDocsPage = () => (
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

export default BottomNavigationDocsPage
