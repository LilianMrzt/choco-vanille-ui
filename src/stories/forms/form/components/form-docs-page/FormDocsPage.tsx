import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/form/constants'
import type { ReactElement } from 'react'

/**
 * Renders the FormDocsPage Storybook example.
 * @internal Not part of the public package API.
 * @returns The example content.
 * @example
 * <FormDocsPage />
 */
const FormDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default FormDocsPage
