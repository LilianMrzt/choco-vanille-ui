import { Canvas, Controls, Description, Markdown, Stories, Title } from '@storybook/addon-docs/blocks'
import { md } from '@stories/_shared/utils/markdown'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                                | Required    | Type      | Notes                                                             |
| ----------------------------------------------- | ----------- | --------- | ----------------------------------------------------------------- |
| \`title\` on \`BottomSheet.Header\`                 | Recommended | \`string\`  | Labels the sheet through \`aria-labelledby\`.                       |
| \`aria-label\` on \`BottomSheet.Content\`           | No          | \`string\`  | Use when no \`BottomSheet.Header\` is rendered.                     |
| \`defaultAriaLabel\` on \`BottomSheet.Content\`     | No          | \`string\`  | @default \`'Bottom sheet'\`. Localize the fallback accessible name. |
| \`aria-label\` on \`BottomSheet.RadioGroup\`        | ✅ Yes      | \`string\`  | Names the \`radiogroup\` (or use \`aria-labelledby\`).              |
| \`disabled\` on items                             | No          | \`boolean\` | The row stays visible and announced, but cannot be activated.    |

- The sheet renders with \`role="dialog"\`; focus is trapped inside while it is open and restored to the trigger on close.
- It closes on **Escape**, a tap on the backdrop, or a downward swipe. Rows are at least 48px tall for comfortable touch targets.
- \`BottomSheet.Item\` renders a native \`<button>\`; \`BottomSheet.RadioItem\` renders \`role="radio"\` with arrow-key navigation inside its group.

**Sub-components**

| Sub-component            | Description                                                      |
| ------------------------ | ---------------------------------------------------------------- |
| \`BottomSheet\`            | Root wrapper that manages open/close state.                      |
| \`BottomSheet.Trigger\`    | Element that opens the sheet.                                    |
| \`BottomSheet.Content\`    | Sheet panel with backdrop and drag handle, rendered in a portal. |
| \`BottomSheet.Header\`     | Title and optional description.                                  |
| \`BottomSheet.Item\`       | Action row; closes the sheet unless \`closeOnClick={false}\`.    |
| \`BottomSheet.RadioGroup\` | Single-choice group of \`BottomSheet.RadioItem\` rows.           |
| \`BottomSheet.RadioItem\`  | Selectable option with a check mark when selected.               |
| \`BottomSheet.Separator\`  | Divides groups of rows.                                          |
| \`BottomSheet.Close\`      | Closes the sheet when activated.                                 |
`

/**
 * Renders the documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation.
 * @example
 * <BottomSheetDocsPage />
 */
const BottomSheetDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default BottomSheetDocsPage
