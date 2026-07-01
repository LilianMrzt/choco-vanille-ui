import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'
import { Button } from '@/components/actions/button'

import { DropdownMenu } from '@/components/overlay/dropdown-menu'
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
  <DropdownMenu.Trigger asChild>
    <Button label="Options" endIcon="mdi:chevron-down" />
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Label label="Account" />
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item label="Profile" startIcon="mdi:account-outline" shortcut="⇧⌘P" />
      <DropdownMenu.Item label="Settings" startIcon="mdi:cog-outline" shortcut="⌘S" />
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item label="Log out" startIcon="mdi:logout" destructive />
  </DropdownMenu.Content>
</DropdownMenu>
\`\`\`

**Accessibility**

| Prop / Attribute | Required | Type | Notes |
|---|---|---|---|
| Trigger (focusable element) | ✅ Yes | — | Use \`asChild\` on \`DropdownMenu.Trigger\` to forward the ref to your own \`Button\` or \`IconButton\`. |
| \`shortcut\` (on \`DropdownMenu.Item\`) | No | \`string\` | Purely decorative — wire actual \`keydown\` handlers in your application. |
| \`destructive\` (on \`DropdownMenu.Item\`) | No | \`boolean\` | Applies danger color to visually warn users before an irreversible action. |
| \`disabled\` (on any item) | No | \`boolean\` | Marks the item as unavailable; it remains visible and announced by screen readers. |

- The menu renders with \`role="menu"\`; items receive \`role="menuitem"\`, \`role="menuitemcheckbox"\`, or \`role="menuitemradio"\` automatically.
- Keyboard navigation is built in: **Enter** / **Space** to open, **Arrow keys** to navigate, **Escape** to close, **Tab** closes and moves focus forward.

**Sub-components**

| Sub-component | Description |
|---|---|
| \`DropdownMenu\` | Root context provider — wraps the entire menu. |
| \`DropdownMenu.Trigger\` | The element that opens the menu on click. Use \`asChild\` to delegate to your own button. |
| \`DropdownMenu.Content\` | The floating panel containing menu items. Handles positioning, animations and keyboard trapping. |
| \`DropdownMenu.Group\` | Logical grouping of related items with no visual separator. Used purely for organization. |
| \`DropdownMenu.Item\` | A single actionable item with optional \`startIcon\`, \`endIcon\`, and \`shortcut\` hint. |
| \`DropdownMenu.CheckboxItem\` | A toggleable item that renders a checkmark indicator when \`checked\`. |
| \`DropdownMenu.RadioGroup\` | Container for mutually exclusive radio items; holds the current \`value\`. |
| \`DropdownMenu.RadioItem\` | A single radio option inside a \`DropdownMenu.RadioGroup\`; selected when its \`value\` matches the group's. |
| \`DropdownMenu.Label\` | Non-interactive section heading used to name a group of items. |
| \`DropdownMenu.Separator\` | A horizontal dividing line between sections. |
| \`DropdownMenu.Sub\` | Root for a nested sub-menu; wraps \`DropdownMenu.SubTrigger\` and \`DropdownMenu.SubContent\`. |
| \`DropdownMenu.SubTrigger\` | An item that reveals the nested sub-menu on hover or keyboard focus. |
| \`DropdownMenu.SubContent\` | The floating panel for the nested sub-menu content. |
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
        a11y: {
            config: {
                rules: [
                    {
                        // Radix UI wraps the page in aria-hidden when the menu is open (modal=true),
                        // which causes the trigger button to appear inside an aria-hidden container.
                        // This is intentional Radix behavior — focus moves into the menu portal.
                        id: 'aria-hidden-focus',
                        enabled: false,
                    },
                ],
            },
        },
    },
    render: () => (
        <DropdownMenu>
            <DropdownMenu.Trigger asChild>
                <Button
                    label={'Open menu'}
                    endIcon={'mdi:chevron-down'}
                />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content>

                {/* Regular items with icons & shortcuts */}
                <DropdownMenu.Label label={'Account'} />
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                    <DropdownMenu.Item
                        label={'Profile'}
                        startIcon={'mdi:account-outline'}
                        shortcut={'⇧⌘P'}
                    />
                    <DropdownMenu.Item
                        label={'Settings'}
                        startIcon={'mdi:cog-outline'}
                        shortcut={'⌘S'}
                    />
                    {/* Sub-menu */}
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger
                            label={'Invite users'}
                            startIcon={'mdi:account-plus-outline'}
                        />
                        <DropdownMenu.SubContent>
                            <DropdownMenu.Item
                                label={'Email'}
                                startIcon={'mdi:email-outline'}
                            />
                            <DropdownMenu.Item
                                label={'Message'}
                                startIcon={'mdi:message-outline'}
                            />
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item
                                label={'More…'}
                                startIcon={'mdi:dots-horizontal'}
                            />
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    {/* Disabled item */}
                    <DropdownMenu.Item
                        label={'API (unavailable)'}
                        startIcon={'mdi:cloud-off-outline'}
                        disabled
                    />
                </DropdownMenu.Group>

                {/* Checkbox items */}
                <DropdownMenu.Separator />
                <DropdownMenu.Label label={'Appearance'} />
                <DropdownMenu.CheckboxItem
                    label={'Show status bar'}
                    checked
                />
                <DropdownMenu.CheckboxItem
                    label={'Show activity bar'}
                    checked={false}
                />

                {/* Radio group */}
                <DropdownMenu.Separator />
                <DropdownMenu.Label label={'Panel position'} />
                <DropdownMenu.RadioGroup value={'bottom'}>
                    <DropdownMenu.RadioItem
                        label={'Top'}
                        value={'top'}
                    />
                    <DropdownMenu.RadioItem
                        label={'Bottom'}
                        value={'bottom'}
                    />
                    <DropdownMenu.RadioItem
                        label={'Right'}
                        value={'right'}
                    />
                </DropdownMenu.RadioGroup>

                {/* Destructive + disabled destructive */}
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                    label={'Delete (unavailable)'}
                    startIcon={'mdi:trash-can-outline'}
                    shortcut={'⌫'}
                    destructive
                    disabled
                />
                <DropdownMenu.Item
                    label={'Log out'}
                    startIcon={'mdi:logout'}
                    destructive
                />

            </DropdownMenu.Content>
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
