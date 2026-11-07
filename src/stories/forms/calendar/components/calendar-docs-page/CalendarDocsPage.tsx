import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { ACCESSIBILITY_DESCRIPTION } from '@stories/forms/calendar/constants'
import type { ReactElement } from 'react'

/**
 * Renders the Calendar documentation page.
 * @internal Storybook-only example; not part of the public package API.
 * @returns The example.
 * @example
 * <CalendarDocsPage />
 */
const CalendarDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default CalendarDocsPage
