import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/primitives/helper-text/constants'

/** Documentation for this story; not part of the public package API. @internal */
const HelperTextDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default HelperTextDocsPage
