import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ReactElement } from 'react'

/**
 * Presents the icon examples and accessible naming guidance.
 * @internal Not part of the public package API.
 * @returns The Icon documentation page.
 * @example
 * <IconDocsPage />
 */
const IconDocsPage = (): ReactElement => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{'## Accessibility\n\n| Prop / Attribute | Required | Type | Notes |\n| --- | --- | --- | --- |\n| `aria-label` | For informative icons | string | Omit for decorative icons, including icons inside named controls. |'}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default IconDocsPage
