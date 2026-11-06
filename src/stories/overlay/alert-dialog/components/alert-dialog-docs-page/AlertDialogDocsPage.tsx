import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
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
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default AlertDialogDocsPage
