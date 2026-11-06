import { ARG_TYPES, DEFAULT_ARGS } from '@stories/overlay/command/constants'
import sourceSizes from '@stories/overlay/command/sources/Sizes.source.tsx.txt?raw'
import sourceStates from '@stories/overlay/command/sources/States.source.tsx.txt?raw'
import sourceWithIcons from '@stories/overlay/command/sources/WithIcons.source.tsx.txt?raw'
import { createControlledCommandSource } from '@stories/overlay/command/utils/create-controlled-command-source/createControlledCommandSource.utils'
import CommandDocsPage from '@stories/overlay/command/components/command-docs-page/CommandDocsPage'
import type { CommandPlaygroundArgs } from '@stories/overlay/command/types'
import CommandPlayground from '@stories/overlay/command/components/command-playground/CommandPlayground'
import CommandSizes from '@stories/overlay/command/components/command-sizes/CommandSizes'
import CommandStates from '@stories/overlay/command/components/command-states/CommandStates'
import CommandWithIcons from '@stories/overlay/command/components/command-with-icons/CommandWithIcons'
import CommandControlledOpen from '@stories/overlay/command/components/command-controlled-open/CommandControlledOpen'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Command } from '@components/overlay/command'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'
import { createCommandSource } from '@stories/overlay/command/utils/create-command-source/createCommandSource.utils'

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
    argTypes: ARG_TYPES,
    args: DEFAULT_ARGS,
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
            source: { type: 'dynamic', transform: createCommandSource },
        },
    },
    render: CommandPlayground,
}

export const Sizes: Story = {
    parameters: {
        docs: {
            description: {
                story: 'All available content panel widths.',
            },
            ...storySource(sourceSizes),
        },
    },
    render: CommandSizes,
}

export const States: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Item states: default, highlighted (keyboard-focus) and disabled.',
            },
            ...storySource(sourceStates),
        },
    },
    render: CommandStates,
}

export const WithIcons: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Items with a leading icon, without an icon, and with both icon and keyboard shortcut.',
            },
            ...storySource(sourceWithIcons),
        },
    },
    render: CommandWithIcons,
}

export const ControlledOpen: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Controlled open state — the palette is opened and closed by an external button. Useful for opening via a keyboard shortcut (e.g. ⌘K).',
            },
            source: { type: 'dynamic', transform: createControlledCommandSource },
        },
    },
    render: CommandControlledOpen,
}
