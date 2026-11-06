import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'

import { ACCESSIBILITY_DESCRIPTION } from '@stories/foundation/typography/constants'
import type { ReactElement } from 'react'

/**
 * Renders the TypographyDocsPage Storybook example.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <TypographyDocsPage />
 */
const TypographyDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default TypographyDocsPage
