import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/svg-image/constants'
import type { ReactElement } from 'react'

/**
 * Renders the SvgImageDocsPage Storybook example.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <SvgImageDocsPage />
 */
const SvgImageDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default SvgImageDocsPage
