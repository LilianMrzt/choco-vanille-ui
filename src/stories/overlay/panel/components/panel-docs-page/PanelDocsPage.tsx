import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/PanelUsage.source.txt?raw'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders panel documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <PanelDocsPage />
 */
const PanelDocsPage = (): ReactElement => (
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
| \`title\` on \`Panel.Header\` | Recommended | \`string\` | Supplies the accessible panel title. |
| \`aria-label\` on \`Panel.Content\` | No | \`string\` | Provides an explicit accessible name. |
| \`closeLabel\` on \`Panel.Header\` | No | \`string\` | Localize the default close control name. |

Provide a close control and choose an appropriate title or localized name.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| Panel.Trigger | Accessible element opening the panel. |
| Panel.Content | Portalled surface with position, width and accessible-name options. |
| Panel.Header | Convenient title, description, actions and close control, or custom children. |
| Panel.Title | Composed accessible panel title. |
| Panel.Description | Composed panel description. |
| Panel.Body | Main-content section. |
| Panel.Footer | Action row. |
| Panel.Close | Custom close element. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default PanelDocsPage
