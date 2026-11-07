import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/autocomplete/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Autocomplete documentation page.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <AutocompleteDocsPage />
 */
const AutocompleteDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default AutocompleteDocsPage
