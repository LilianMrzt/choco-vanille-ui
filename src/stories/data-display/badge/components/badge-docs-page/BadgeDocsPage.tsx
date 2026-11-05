import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/badge/components/badge-docs-page/constants'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { type ReactElement } from 'react'

/**
 * Documents the Badge playground, controls and decorative icon requirements.
 * @internal Not part of the public package API.
 * @returns The component's documentation page.
 * @example
 * <BadgeDocsPage />
 */
const BadgeDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default BadgeDocsPage
