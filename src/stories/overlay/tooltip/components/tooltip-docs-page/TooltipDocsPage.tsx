import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders tooltip documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <TooltipDocsPage />
 */
const TooltipDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`content\` | Yes | \`ReactNode\` | Supplementary, non-interactive content. |
| \`children\` | Yes | Focusable element | A single trigger that accepts a ref. |
| \`openOnFocus\` | No | \`boolean\` | Defaults to \`true\`; preserves keyboard access. |
| \`disabled\` | No | \`boolean\` | Suppresses the tooltip. |
| \`open\` / \`defaultOpen\` | No | \`boolean\` | Controlled or initial uncontrolled state. |

Do not place essential information exclusively in a tooltip. The popup uses a
document portal, so it does not automatically inherit locally scoped themes.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default TooltipDocsPage
