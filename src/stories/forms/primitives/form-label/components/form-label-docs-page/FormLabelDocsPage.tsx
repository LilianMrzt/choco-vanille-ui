import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

const accessibility = `
## Accessibility

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| id | Yes | string | Reference this ID using the control's aria-labelledby. |
| required | No | boolean | Also set the control's required state. |
`

/** Documentation for this story; not part of the public package API. @internal */
const FormLabelDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{accessibility}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default FormLabelDocsPage
