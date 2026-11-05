import { ACCESSIBILITY_DESCRIPTION } from '@stories/data-display/table/components/table-docs-page/constants'
import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

/**
 * Documents the compound table slots and their native attribute contracts.
 * @internal Not part of the public package API.
 * @returns The table documentation page.
 * @example
 * <TableDocsPage />
 */
const TableDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default TableDocsPage
