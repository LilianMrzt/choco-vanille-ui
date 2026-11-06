import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/layout/box/constants'
import type { ReactElement } from 'react'

/**
 * Renders the BoxDocsPage Storybook example.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <BoxDocsPage />
 */
const BoxDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default BoxDocsPage
