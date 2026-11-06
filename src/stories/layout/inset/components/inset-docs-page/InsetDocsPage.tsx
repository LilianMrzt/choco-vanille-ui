import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import { ACCESSIBILITY_DESCRIPTION } from '@stories/layout/inset/constants'
import type { ReactElement } from 'react'

/**
 * Renders the InsetDocsPage Storybook example.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <InsetDocsPage />
 */
const InsetDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default InsetDocsPage
