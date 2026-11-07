import { Canvas, Controls, Description, Markdown, Source, Stories, Title } from '@storybook/addon-docs/blocks'
import usageSource from '../../sources/CommandUsage.source.txt?raw'
import { md } from '@stories/_shared/utils/markdown'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                      | Required    | Type              | Notes                                                                  |
| ------------------------------------- | ----------- | ----------------- | ---------------------------------------------------------------------- |
| \`aria-label\` on \`Command.Content\`     | Recommended | \`string\`          | Overrides the default \`'Command palette'\` label on the dialog.         |
| \`aria-label\` on \`Command.List\`        | No          | \`string\`          | Overrides the default \`'Commands'\` listbox label.                      |
| \`aria-label\` on \`Command.Input\`       | No          | \`string\`          | Overrides the default \`'Search'\` label on the combobox input.          |
| \`defaultClearAriaLabel\` on \`Command.Input\` | No     | \`string\`          | Label for the clear button. Defaults to \`'Clear search'\`. Override for i18n. |
| \`label\` on \`Command.Group\`            | No          | \`string\`          | Provides an accessible name for the item group via \`aria-labelledby\`.  |
| \`disabled\` on \`Command.Item\`          | No          | \`boolean\`         | Excludes the item from keyboard navigation and pointer interaction.     |

- The command palette traps focus while open; pressing **Escape** closes it.
- **↑ / ↓** arrow keys navigate between visible, enabled items.
- **Enter** activates the currently highlighted item.
- The search input implements the WAI-ARIA combobox pattern with \`aria-activedescendant\`.
- Items not matching the search are removed from the accessibility tree via the \`hidden\` attribute.
- A clear button (\`IconButton\`) appears when the input has a value; clicking it resets the search.
- \`Command.Empty\` is revealed via CSS \`:has()\` when no visible items remain; no JavaScript state is involved.

**Sub-components**

| Sub-component        | Description                                               |
| -------------------- | --------------------------------------------------------- |
| \`Command\`            | Root wrapper — manages open/close state (Base UI Dialog). |
| \`Command.Trigger\`    | Element that opens the command palette.                   |
| \`Command.Content\`    | The modal panel; creates the shared search context.       |
| \`Command.Input\`      | The combobox search field with integrated clear button.   |
| \`Command.List\`       | The scrollable listbox container.                         |
| \`Command.Group\`      | A labeled section of items inside the list.               |
| \`Command.Item\`       | A single activatable command.                             |
| \`Command.Empty\`      | Displayed when no items match the current search.         |
| \`Command.Separator\`  | Horizontal divider between groups.                        |
`

/**
 * Renders the documentation.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The documentation.
 * @example
 * <CommandDocsPage />
 */
const CommandDocsPage = () => (
    <>
        <Title />
        <Description />
        <Source
            code={usageSource}
            language={'tsx'}
        />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

export default CommandDocsPage
