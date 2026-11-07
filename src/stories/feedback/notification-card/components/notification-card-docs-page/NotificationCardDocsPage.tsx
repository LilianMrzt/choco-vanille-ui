import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import usageSource from '@stories/feedback/notification-card/sources/NotificationCardUsage.source.txt?raw'
import { DOCUMENTATION } from '@stories/feedback/notification-card/components/notification-card-docs-page/constants'

/**
 * Renders notification-card documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <NotificationCardDocsPage />
 */
const NotificationCardDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Source
            code={usageSource}
            language={'tsx'}
        />
        <Canvas />
        <Controls />
        <Markdown>{DOCUMENTATION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default NotificationCardDocsPage
