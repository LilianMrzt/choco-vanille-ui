import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'
import { Button } from '@/components/actions/button'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from '@/components/overlay/dropdown-menu'
import { Flex } from '@/components/layout/flex'

const meta = {
    title: 'Overlay/DropdownMenu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A fully composable dropdown menu built on top of [\`@radix-ui/react-dropdown-menu\`](https://www.radix-ui.com/docs/primitives/components/dropdown-menu).
It supports regular items with icons and keyboard shortcuts, checkbox items, radio groups, separators, labels, and nested sub-menus.

**Composition**
\`\`\`tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button label="Options" endIcon="mdi:chevron-down" />
  </DropdownMenuTrigger>

  <DropdownMenuContent>
    <DropdownMenuLabel label="Account" />
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem label="Profile" startIcon="mdi:account-outline" shortcut="⇧⌘P" />
      <DropdownMenuItem label="Settings" startIcon="mdi:cog-outline" shortcut="⌘S" />
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem label="Log out" startIcon="mdi:logout" destructive />
  </DropdownMenuContent>
</DropdownMenu>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| Trigger (focusable element) | ✅ Yes | — | Use \`asChild\` on \`DropdownMenuTrigger\` to forward the ref to your own \`Button\` or \`IconButton\`. |
| \`shortcut\` (on \`DropdownMenuItem\`) | No | \`string\` | Purely decorative — wire actual \`keydown\` handlers in your application. |
| \`destructive\` (on \`DropdownMenuItem\`) | No | \`boolean\` | Applies danger color to visually warn users before an irreversible action. |
| \`disabled\` (on any item) | No | \`boolean\` | Marks the item as unavailable; it remains visible and announced by screen readers. |

- The menu renders with \`role="menu"\`; items receive \`role="menuitem"\`, \`role="menuitemcheckbox"\`, or \`role="menuitemradio"\` automatically.
- Keyboard navigation is built in: **Enter** / **Space** to open, **Arrow keys** to navigate, **Escape** to close, **Tab** closes and moves focus forward.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`DropdownMenu\` | Root context provider — wraps the entire menu. |
| \`DropdownMenuTrigger\` | The element that opens the menu on click. Use \`asChild\` to delegate to your own button. |
| \`DropdownMenuContent\` | The floating panel containing menu items. Handles positioning, animations and keyboard trapping. |
| \`DropdownMenuGroup\` | Logical grouping of related items with no visual separator. Used purely for organization. |
| \`DropdownMenuItem\` | A single actionable item with optional \`startIcon\`, \`endIcon\`, and \`shortcut\` hint. |
| \`DropdownMenuCheckboxItem\` | A toggleable item that renders a checkmark indicator when \`checked\`. |
| \`DropdownMenuRadioGroup\` | Container for mutually exclusive radio items; holds the current \`value\`. |
| \`DropdownMenuRadioItem\` | A single radio option inside a \`DropdownMenuRadioGroup\`; selected when its \`value\` matches the group's. |
| \`DropdownMenuLabel\` | Non-interactive section heading used to name a group of items. |
| \`DropdownMenuSeparator\` | A horizontal dividing line between sections. |
| \`DropdownMenuSub\` | Root for a nested sub-menu; wraps \`DropdownMenuSubTrigger\` and \`DropdownMenuSubContent\`. |
| \`DropdownMenuSubTrigger\` | An item that reveals the nested sub-menu on hover or keyboard focus. |
| \`DropdownMenuSubContent\` | The floating panel for the nested sub-menu content. |
                `,
            },
        },
    },
    decorators: [
        (Story) => (
            <Flex
                align={'start'}
                justify={'center'}
                pt={'2xl'}
                style={{ minHeight: '16rem' }}
            >
                <Story />
            </Flex>
        ),
    ],
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

// All features — single story showcasing every building block

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'A comprehensive example showcasing every available building block: regular items with icons and keyboard shortcuts, a nested sub-menu, checkbox items, a radio group, and a destructive item.',
            },
        },
    },
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    label={'Open menu'}
                    endIcon={'mdi:chevron-down'}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>

                {/* Regular items with icons & shortcuts */}
                <DropdownMenuLabel label={'Account'} />
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        label={'Profile'}
                        startIcon={'mdi:account-outline'}
                        shortcut={'⇧⌘P'}
                    />
                    <DropdownMenuItem
                        label={'Settings'}
                        startIcon={'mdi:cog-outline'}
                        shortcut={'⌘S'}
                    />
                    {/* Sub-menu */}
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger
                            label={'Invite users'}
                            startIcon={'mdi:account-plus-outline'}
                        />
                        <DropdownMenuSubContent>
                            <DropdownMenuItem
                                label={'Email'}
                                startIcon={'mdi:email-outline'}
                            />
                            <DropdownMenuItem
                                label={'Message'}
                                startIcon={'mdi:message-outline'}
                            />
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                label={'More…'}
                                startIcon={'mdi:dots-horizontal'}
                            />
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    {/* Disabled item */}
                    <DropdownMenuItem
                        label={'API (unavailable)'}
                        startIcon={'mdi:cloud-off-outline'}
                        disabled
                    />
                </DropdownMenuGroup>

                {/* Checkbox items */}
                <DropdownMenuSeparator />
                <DropdownMenuLabel label={'Appearance'} />
                <DropdownMenuCheckboxItem
                    label={'Show status bar'}
                    checked
                />
                <DropdownMenuCheckboxItem
                    label={'Show activity bar'}
                    checked={false}
                />

                {/* Radio group */}
                <DropdownMenuSeparator />
                <DropdownMenuLabel label={'Panel position'} />
                <DropdownMenuRadioGroup value={'bottom'}>
                    <DropdownMenuRadioItem
                        label={'Top'}
                        value={'top'}
                    />
                    <DropdownMenuRadioItem
                        label={'Bottom'}
                        value={'bottom'}
                    />
                    <DropdownMenuRadioItem
                        label={'Right'}
                        value={'right'}
                    />
                </DropdownMenuRadioGroup>

                {/* Destructive + disabled destructive */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    label={'Delete (unavailable)'}
                    startIcon={'mdi:trash-can-outline'}
                    shortcut={'⌫'}
                    destructive
                    disabled
                />
                <DropdownMenuItem
                    label={'Log out'}
                    startIcon={'mdi:logout'}
                    destructive
                />

            </DropdownMenuContent>
        </DropdownMenu>
    ),
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: /open menu/i })
        await expect(trigger).toBeInTheDocument()
        await userEvent.click(trigger)
        await waitFor(() =>
            expect(document.querySelector('[role="menu"]')).toBeTruthy(),
        )
    },
}
