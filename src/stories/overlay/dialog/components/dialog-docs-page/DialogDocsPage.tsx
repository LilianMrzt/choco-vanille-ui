import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/DialogUsage.source.txt?raw'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders dialog documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <DialogDocsPage />
 */
const DialogDocsPage = (): ReactElement => (
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
| \`aria-label\` on \`Dialog.Content\` | No | \`string\` | Names the dialog; defaults to \`Dialog\` unless labelled externally. |
| \`titleAs\` on \`Dialog.Header\` | No | \`h1\`–\`h6\` | Choose a heading level appropriate to the page. |
| \`modal\` | No | boolean or \`'trap-focus'\` | Controls focus trapping and outside interaction. |

Use an accessible name appropriate to the content and provide a close control.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| Dialog.Trigger | Accessible element opening the dialog. |
| Dialog.Content | Portalled dialog surface with size and accessible-name options. |
| Dialog.Header | Convenient title, description, actions and optional close button, or custom children. |
| Dialog.Title | Composed accessible dialog title. |
| Dialog.Description | Composed accessible dialog description. |
| Dialog.Body | Semantic main-content section. |
| Dialog.Footer | Semantic action row. |
| Dialog.Close | Element closing the dialog. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default DialogDocsPage
