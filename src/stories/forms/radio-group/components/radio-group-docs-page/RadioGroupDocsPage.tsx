import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/radio-group/constants'
import type { ReactElement } from 'react'

/**
 * Renders the RadioGroup documentation page.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <RadioGroupDocsPage />
 */
const RadioGroupDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default RadioGroupDocsPage
