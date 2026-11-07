import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/primitives/fieldset/constants'

/**
 * Presents fieldset examples and accessible naming guidance.
 * @internal Not part of the public package API.
 * @returns The Fieldset documentation page.
 * @example
 * <FieldsetDocsPage />
 */
const FieldsetDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default FieldsetDocsPage
