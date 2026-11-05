import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/rich-text-renderer/components/rich-text-renderer-docs-page/constants'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { type ReactElement } from 'react'

/**
 * Documents the read-only document playground and content accessibility.
 * @internal Not part of the public package API.
 * @returns The component's documentation page.
 * @example
 * <RichTextRendererDocsPage />
 */
const RichTextRendererDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default RichTextRendererDocsPage
