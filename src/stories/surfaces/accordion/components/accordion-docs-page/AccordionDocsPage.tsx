import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import usageSource from '../../sources/AccordionUsage.source.txt?raw'
import { md } from '@stories/_shared/utils/markdown'

/**
 * Documents composition, controls and accessible accordion behavior.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example <AccordionDocsPage />
 */
const AccordionDocsPage = (): ReactElement => (
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
| Trigger label or children | Yes | React content | Give each trigger a meaningful accessible name. |
| Item value | Yes | string | Unique within its root; associates expanded values with items. |
| disabled | No | boolean | Prevents activation while retaining the item in the document. |

Use arrow keys to move focus, Home/End to reach the first/last trigger, and Enter or Space to toggle.
Orientation changes the arrow-key direction, not the visual stacking of these items.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| Accordion.Item | Groups one trigger and its content; owns the item value and disabled state. |
| Accordion.Trigger | Toggle button accepting children or a label with decorative icons. |
| Accordion.Content | Panel associated with its trigger and revealed when expanded. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default AccordionDocsPage
