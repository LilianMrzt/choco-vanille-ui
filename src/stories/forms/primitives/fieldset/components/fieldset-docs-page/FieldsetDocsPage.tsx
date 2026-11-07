import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

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
        <Markdown>{'## Accessibility\n\n| Prop / Attribute | Required | Type | Notes |\n| --- | --- | --- | --- |\n| `Legend` | Yes | ReactNode | Names the group of related controls. |\n| `disabled` | No | boolean | Disables controls outside the first legend. |'}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default FieldsetDocsPage
