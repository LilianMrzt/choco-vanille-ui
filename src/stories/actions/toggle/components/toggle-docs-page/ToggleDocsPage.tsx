import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'

/** Documentation for standalone and grouped toggles. */
const ToggleDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{`
## Accessibility

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`label\` | Text mode | \`string\` | Names the button. |
| \`aria-label\` | Icon-only mode | \`string\` | Names the button when no text is visible. |
| \`aria-pressed\` | Automatic | \`boolean\` | Exposes the current pressed state. |
| \`disabled\` | No | \`boolean\` | Prevents activation and removes the button from focus. |

The native button supports Space and Enter.
Give each group an accessible name and each item a unique value. Arrow keys move
focus according to the group's orientation.

## Sizes

Toggle and ToggleGroup.Item share Button's 28px sm, 36px md (default), and 44px lg
heights at a 16px root font size. Labels use 14px, 14px and 16px respectively.
Icon-only toggles are square. Sizes use rem units and do not change with viewport
or pointer type. Prefer lg for touch-oriented actions.
        `}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default ToggleDocsPage
