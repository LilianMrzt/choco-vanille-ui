import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/AlertDialogUsage.source.txt?raw'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders confirmation dialog documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <AlertDialogDocsPage />
 */
const AlertDialogDocsPage = (): ReactElement => (
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
| \`aria-label\` on \`AlertDialog.Content\` | No | \`string\` | Names the dialog; defaults to \`Dialog\` unless labelled externally. |
| \`AlertDialog.Cancel\` | Recommended | \`ButtonProps\` | Provides an explicit safe exit. |
| \`AlertDialog.Action\` | Recommended | \`ButtonProps\` | Provide a descriptive confirmation label. |

Supply a localized accessible name appropriate to the confirmation.

## Subcomponents

| Subcomponent | Description |
| --- | --- |
| AlertDialog.Trigger | Accessible element opening the confirmation. |
| AlertDialog.Content | Dialog surface with size and accessible-name options. |
| AlertDialog.Header | Convenient title, description and close control, or custom children. |
| AlertDialog.Title | Composed accessible confirmation title. |
| AlertDialog.Description | Composed confirmation description. |
| AlertDialog.Body | Confirmation details. |
| AlertDialog.Footer | Confirmation action row. |
| AlertDialog.Close | Custom close element. |
| AlertDialog.Cancel | Safe exit button with outlined defaults. |
| AlertDialog.Action | Confirmation button with destructive defaults; closes after activation. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default AlertDialogDocsPage
