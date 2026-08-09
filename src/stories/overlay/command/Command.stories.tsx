import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { useState, type ComponentProps } from 'react'

import { Button } from '@components/actions/button'
import { Command, type CommandSize } from '@components/overlay/command'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import { md } from '@stories/utils/markdown'
import { storySource } from '@stories/utils/storySource'

type CommandPlaygroundArgs = ComponentProps<typeof Command> & {
  size?: CommandSize;
  inputPlaceholder?: string;
  inputClearAriaLabel?: string;
  showGroup1?: boolean;
  showGroup2?: boolean;
  showIcons?: boolean;
  showShortcuts?: boolean;
};

const SIZES: CommandSize[] = ['sm', 'md', 'lg']

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

const CommandDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta: Meta<CommandPlaygroundArgs> = {
    title: 'Overlay/Command',
    component: Command,
    parameters: {
        layout: 'centered',
        docs: {
            page: CommandDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A modal command palette for action search and keyboard navigation, built on Base UI Dialog.

Compose with \`Command.Trigger\`, \`Command.Content\`, \`Command.Input\`, \`Command.List\`, \`Command.Group\`, \`Command.Item\`, \`Command.Empty\` and \`Command.Separator\`.

**Usage**

~~~tsx
<Command>
  <Command.Trigger>
    <Button label="Open command palette" variant="outlined" color="primary" />
  </Command.Trigger>
  <Command.Content>
    <Command.Input placeholder="Search actions…" />
    <Command.List aria-label="Commands">
      <Command.Group label="Actions">
        <Command.Item icon={SearchIcon} shortcut="⌘E" onSelect={() => {}}>
          Edit profile
        </Command.Item>
        <Command.Item icon={SearchIcon} shortcut="⌘S" onSelect={() => {}}>
          Settings
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group label="Navigation">
        <Command.Item icon={UserIcon} onSelect={() => {}}>
          Go to dashboard
        </Command.Item>
      </Command.Group>
      <Command.Empty>No results found.</Command.Empty>
    </Command.List>
  </Command.Content>
</Command>
~~~
        `,
            },
        },
    },
    argTypes: {
        open: {
            control: 'boolean',
            table: { category: 'Command' },
        },
        defaultOpen: {
            control: 'boolean',
            table: { category: 'Command' },
        },
        modal: {
            control: 'boolean',
            table: { category: 'Command' },
        },
        size: {
            control: 'select',
            options: SIZES,
            table: { category: 'Compound: Content' },
        },
        inputPlaceholder: {
            control: 'text',
            table: { category: 'Compound: Input' },
        },
        inputClearAriaLabel: {
            control: 'text',
            table: { category: 'Compound: Input' },
        },
        showGroup1: {
            control: 'boolean',
            table: { category: 'Compound: List' },
        },
        showGroup2: {
            control: 'boolean',
            table: { category: 'Compound: List' },
        },
        showIcons: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
        showShortcuts: {
            control: 'boolean',
            table: { category: 'Compound: Item' },
        },
    },
    args: {
        defaultOpen: false,
        modal: true,
        size: 'md',
        inputPlaceholder: 'Search actions…',
        inputClearAriaLabel: 'Clear search',
        showGroup1: true,
        showGroup2: true,
        showIcons: true,
        showShortcuts: true,
    },
} satisfies Meta<CommandPlaygroundArgs>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — every prop for all sub-components is exposed in the Controls panel, grouped by slot.',
            },
            ...storySource(/* language=tsx */ `
<Command>
  <Command.Trigger>
    <Button label="Open command palette" variant="outlined" color="primary" />
  </Command.Trigger>
  <Command.Content size="md">
    <Command.Input placeholder="Search actions…" />
    <Command.List aria-label="Commands">
      <Command.Group label="Actions">
        <Command.Item icon={SearchIcon} shortcut="⌘E" onSelect={() => {}}>
          Edit profile
        </Command.Item>
        <Command.Item icon={SearchIcon} shortcut="⌘S" onSelect={() => {}}>
          Settings
        </Command.Item>
        <Command.Item icon={TrashIcon} disabled>
          Delete account
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group label="Navigation">
        <Command.Item icon={UserIcon} shortcut="⌘H" onSelect={() => {}}>
          Go to dashboard
        </Command.Item>
        <Command.Item icon={UserIcon} shortcut="⌘P" onSelect={() => {}}>
          My profile
        </Command.Item>
      </Command.Group>
      <Command.Empty>No results found.</Command.Empty>
    </Command.List>
  </Command.Content>
</Command>`),
        },
    },
    render: ({
        modal,
        size,
        inputPlaceholder,
        inputClearAriaLabel,
        showGroup1,
        showGroup2,
        showIcons,
        showShortcuts,
    }) => (
        <Command
            defaultOpen={false}
            modal={modal}
        >
            <Command.Trigger>
                <Button
                    label={'Open command palette'}
                    variant={'outlined'}
                    color={'primary'}
                />
            </Command.Trigger>
            <Command.Content size={size}>
                <Command.Input
                    placeholder={inputPlaceholder}
                    defaultClearAriaLabel={inputClearAriaLabel}
                />
                <Command.List aria-label={'Commands'}>
                    {showGroup1 && (
                        <Command.Group label={'Actions'}>
                            <Command.Item
                                icon={showIcons ? SearchIcon : undefined}
                                shortcut={showShortcuts ? '⌘E' : undefined}
                                onSelect={() => {}}
                            >
                                Edit profile
                            </Command.Item>
                            <Command.Item
                                icon={showIcons ? SearchIcon : undefined}
                                shortcut={showShortcuts ? '⌘S' : undefined}
                                onSelect={() => {}}
                            >
                                Settings
                            </Command.Item>
                            <Command.Item
                                icon={showIcons ? TrashIcon : undefined}
                                disabled
                            >
                                Delete account
                            </Command.Item>
                        </Command.Group>
                    )}
                    {showGroup1 && showGroup2 && <Command.Separator />}
                    {showGroup2 && (
                        <Command.Group label={'Navigation'}>
                            <Command.Item
                                icon={showIcons ? UserIcon : undefined}
                                shortcut={showShortcuts ? '⌘H' : undefined}
                                onSelect={() => {}}
                            >
                                Go to dashboard
                            </Command.Item>
                            <Command.Item
                                icon={showIcons ? UserIcon : undefined}
                                shortcut={showShortcuts ? '⌘P' : undefined}
                                onSelect={() => {}}
                            >
                                My profile
                            </Command.Item>
                        </Command.Group>
                    )}
                    <Command.Empty>No results found.</Command.Empty>
                </Command.List>
            </Command.Content>
        </Command>
    ),
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All available content panel widths.',
            },
            ...storySource(/* language=tsx */ `
<div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
  <Command>
    <Command.Trigger>
      <Button label="sm" variant="outlined" color="primary" />
    </Command.Trigger>
    <Command.Content size="sm">
      <Command.Input placeholder="Search…" />
      <Command.List aria-label="Commands">
        <Command.Item onSelect={() => {}}>Edit profile</Command.Item>
        <Command.Item onSelect={() => {}}>Settings</Command.Item>
        <Command.Empty>No results found.</Command.Empty>
      </Command.List>
    </Command.Content>
  </Command>

  <Command>
    <Command.Trigger>
      <Button label="md" variant="outlined" color="primary" />
    </Command.Trigger>
    <Command.Content size="md">
      <Command.Input placeholder="Search…" />
      <Command.List aria-label="Commands">
        <Command.Item onSelect={() => {}}>Edit profile</Command.Item>
        <Command.Item onSelect={() => {}}>Settings</Command.Item>
        <Command.Empty>No results found.</Command.Empty>
      </Command.List>
    </Command.Content>
  </Command>

  <Command>
    <Command.Trigger>
      <Button label="lg" variant="outlined" color="primary" />
    </Command.Trigger>
    <Command.Content size="lg">
      <Command.Input placeholder="Search…" />
      <Command.List aria-label="Commands">
        <Command.Item onSelect={() => {}}>Edit profile</Command.Item>
        <Command.Item onSelect={() => {}}>Settings</Command.Item>
        <Command.Empty>No results found.</Command.Empty>
      </Command.List>
    </Command.Content>
  </Command>
</div>`),
        },
    },
    render: () => (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {SIZES.map((size) => (
                <Command
                    defaultOpen={false}
                    key={size}
                >
                    <Command.Trigger>
                        <Button
                            label={size}
                            variant={'outlined'}
                            color={'primary'}
                        />
                    </Command.Trigger>
                    <Command.Content size={size}>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List aria-label={'Commands'}>
                            <Command.Item onSelect={() => {}}>Edit profile</Command.Item>
                            <Command.Item onSelect={() => {}}>Settings</Command.Item>
                            <Command.Empty>No results found.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>
            ))}
        </div>
    ),
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Item states: default, highlighted (keyboard-focus) and disabled.',
            },
            ...storySource(/* language=tsx */ `
<Command defaultOpen>
  <Command.Content>
    <Command.Input placeholder="Search…" />
    <Command.List aria-label="Commands">
      <Command.Group label="States">
        <Command.Item icon={SearchIcon} onSelect={() => {}}>
          Default item
        </Command.Item>
        <Command.Item icon={SearchIcon} onSelect={() => {}}>
          Another item
        </Command.Item>
        <Command.Item icon={TrashIcon} disabled>
          Disabled item
        </Command.Item>
      </Command.Group>
      <Command.Empty>No results found.</Command.Empty>
    </Command.List>
  </Command.Content>
</Command>`),
        },
    },
    render: () => (
        <Command defaultOpen={false}>
            <Command.Content>
                <Command.Input placeholder={'Search…'} />
                <Command.List aria-label={'Commands'}>
                    <Command.Group label={'States'}>
                        <Command.Item
                            icon={SearchIcon}
                            onSelect={() => {}}
                        >
                            Default item
                        </Command.Item>
                        <Command.Item
                            icon={SearchIcon}
                            onSelect={() => {}}
                        >
                            Another item
                        </Command.Item>
                        <Command.Item
                            icon={TrashIcon}
                            disabled
                        >
                            Disabled item
                        </Command.Item>
                    </Command.Group>
                    <Command.Empty>No results found.</Command.Empty>
                </Command.List>
            </Command.Content>
        </Command>
    ),
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Items with a leading icon, without an icon, and with both icon and keyboard shortcut.',
            },
            ...storySource(/* language=tsx */ `
<Command defaultOpen>
  <Command.Content>
    <Command.Input placeholder="Search…" />
    <Command.List aria-label="Commands">
      <Command.Group label="Icon variants">
        <Command.Item onSelect={() => {}}>
          No icon
        </Command.Item>
        <Command.Item icon={SearchIcon} onSelect={() => {}}>
          With icon
        </Command.Item>
        <Command.Item icon={SearchIcon} shortcut="⌘S" onSelect={() => {}}>
          Icon and shortcut
        </Command.Item>
      </Command.Group>
      <Command.Empty>No results found.</Command.Empty>
    </Command.List>
  </Command.Content>
</Command>`),
        },
    },
    render: () => (
        <Command defaultOpen={false}>
            <Command.Content>
                <Command.Input placeholder={'Search…'} />
                <Command.List aria-label={'Commands'}>
                    <Command.Group label={'Icon variants'}>
                        <Command.Item onSelect={() => {}}>
                            No icon
                        </Command.Item>
                        <Command.Item
                            icon={SearchIcon}
                            onSelect={() => {}}
                        >
                            With icon
                        </Command.Item>
                        <Command.Item
                            icon={SearchIcon}
                            shortcut={'⌘S'}
                            onSelect={() => {}}
                        >
                            Icon and shortcut
                        </Command.Item>
                    </Command.Group>
                    <Command.Empty>No results found.</Command.Empty>
                </Command.List>
            </Command.Content>
        </Command>
    ),
}

export const ControlledOpen: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Controlled open state — the palette is opened and closed by an external button. Useful for opening via a keyboard shortcut (e.g. ⌘K).',
            },
            ...storySource(/* language=tsx */ `
function ControlledCommandExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        label="Toggle command palette (⌘K)"
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      />
      <Command open={open} onOpenChange={setOpen}>
        <Command.Content>
          <Command.Input placeholder="Search…" />
          <Command.List aria-label="Commands">
            <Command.Group label="Actions">
              <Command.Item icon={SearchIcon} shortcut="⌘E" onSelect={() => setOpen(false)}>
                Edit profile
              </Command.Item>
              <Command.Item icon={SearchIcon} shortcut="⌘S" onSelect={() => setOpen(false)}>
                Settings
              </Command.Item>
            </Command.Group>
            <Command.Empty>No results found.</Command.Empty>
          </Command.List>
        </Command.Content>
      </Command>
    </>
  );
}`),
        },
    },
    render: () => {
        const [open, setOpen] = useState(false)

        return (
            <>
                <Button
                    label={'Toggle command palette (⌘K)'}
                    variant={'contained'}
                    color={'primary'}
                    onClick={() => setOpen(true)}
                />
                <Command
                    open={open}
                    onOpenChange={setOpen}
                >
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List aria-label={'Commands'}>
                            <Command.Group label={'Actions'}>
                                <Command.Item
                                    icon={SearchIcon}
                                    shortcut={'⌘E'}
                                    onSelect={() => setOpen(false)}
                                >
                                    Edit profile
                                </Command.Item>
                                <Command.Item
                                    icon={SearchIcon}
                                    shortcut={'⌘S'}
                                    onSelect={() => setOpen(false)}
                                >
                                    Settings
                                </Command.Item>
                            </Command.Group>
                            <Command.Empty>No results found.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>
            </>
        )
    },
}
