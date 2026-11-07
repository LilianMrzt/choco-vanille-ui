import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/primitives/legend/constants'
import type { ReactElement } from 'react'

/**
 * Presents Legend documentation and accessible grouping guidance.
 * @internal Not part of the public package API.
 * @returns The Legend documentation page.
 * @example
 * <LegendDocsPage />
 */
const LegendDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default LegendDocsPage
