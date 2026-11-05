import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/avatar-group/components/avatar-group-docs-page/constants'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

/**
 * Documents group labeling and overflow naming.
 * @internal Not part of the public package API.
 * @returns The AvatarGroup documentation page.
 * @example
 * <AvatarGroupDocsPage />
 */
const AvatarGroupDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default AvatarGroupDocsPage
