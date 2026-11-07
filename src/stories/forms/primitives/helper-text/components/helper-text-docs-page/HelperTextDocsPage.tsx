import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

const accessibility = `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| id | Yes | string | Reference this ID using the control's aria-describedby. |
| hasError | No | boolean | Uses an assertive alert instead of a polite status. |
`

/** Documentation for this story; not part of the public package API. @internal */
const HelperTextDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{accessibility}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default HelperTextDocsPage
