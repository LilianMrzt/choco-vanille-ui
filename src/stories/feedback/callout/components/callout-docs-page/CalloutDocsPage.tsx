import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'
import usageSource from '@stories/feedback/callout/sources/CalloutUsage.source.txt?raw'
import { DOCUMENTATION } from '@stories/feedback/callout/components/callout-docs-page/constants'

/**
 * Renders callout documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation page.
 * @example
 * <CalloutDocsPage />
 */
const CalloutDocsPage = (): ReactElement => (
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

export default CalloutDocsPage
