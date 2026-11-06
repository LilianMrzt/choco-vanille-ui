import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders the spinner documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <SpinnerDocsPage />
 */
const SpinnerDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-label\` | No | \`string\` | Provide a name or descriptive content when the loading state needs an explanation. |
| \`role\` | No | \`string\` | Defaults to \`status\`; override when appropriate. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default SpinnerDocsPage
