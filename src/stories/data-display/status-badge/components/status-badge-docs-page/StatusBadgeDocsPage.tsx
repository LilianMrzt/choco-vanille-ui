import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/status-badge/components/status-badge-docs-page/constants'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { type ReactElement } from 'react'

/**
 * Documents indicator controls and accessible naming.
 * @internal Not part of the public package API.
 * @returns The component's documentation page.
 * @example
 * <StatusBadgeDocsPage />
 */
const StatusBadgeDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default StatusBadgeDocsPage
