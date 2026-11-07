import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import usageSource from '@stories/actions/toggle/sources/ToggleUsage.source.txt?raw'
import { DOCUMENTATION } from '@stories/actions/toggle/components/toggle-docs-page/constants'

/**
 * Documents standalone and grouped toggles.
 * @internal Not part of the public package API.
 * @returns Usage, controls and accessibility guidance.
 * @example <ToggleDocsPage />
 */
const ToggleDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Source code={usageSource} />
        <Canvas />
        <Controls />
        <Markdown>{DOCUMENTATION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ToggleDocsPage
