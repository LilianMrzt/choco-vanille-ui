import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders tab documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <TabsDocsPage />
 */
const TabsDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`Tabs.List aria-label\` / \`aria-labelledby\` | Yes | \`string\` | Names the tab set. |
| \`value\` / \`defaultValue\` | No | Tab value | Controlled or initial uncontrolled selection. |
| \`orientation\` | No | \`horizontal \\| vertical\` | Determines keyboard direction. |
| \`activationMode\` | No | \`manual \\| automatic\` | On Tabs.List; defaults to manual unless activateOnFocus is supplied. |

Use arrow keys to move focus and Enter or Space to activate in manual mode.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default TabsDocsPage
