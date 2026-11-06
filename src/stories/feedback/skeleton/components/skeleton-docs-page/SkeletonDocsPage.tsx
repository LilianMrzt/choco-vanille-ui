import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

import { md } from '@stories/_shared/utils/markdown'

/**
 * Renders the skeleton documentation and accessibility guidance.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <SkeletonDocsPage />
 */
const SkeletonDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{md`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`aria-hidden\` | No | \`boolean\` | Defaults to \`true\`; communicate loading separately when needed. |
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default SkeletonDocsPage
