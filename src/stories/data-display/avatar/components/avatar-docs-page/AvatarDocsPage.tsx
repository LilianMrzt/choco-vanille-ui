import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/avatar/components/avatar-docs-page/constants'
import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '@stories/data-display/avatar/sources/AvatarUsage.source.txt?raw'
import type { ReactElement } from 'react'

/**
 * Documents avatar accessible naming alongside the interactive examples.
 * @internal Not part of the public package API.
 * @returns The Avatar documentation page.
 * @example
 * <AvatarDocsPage />
 */
const AvatarDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Source code={usageSource} />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default AvatarDocsPage
