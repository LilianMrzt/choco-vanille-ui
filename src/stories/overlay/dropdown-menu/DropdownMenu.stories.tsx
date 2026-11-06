import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
    Canvas,
    Controls,
    Description,
    Markdown,
    Stories,
    Title,
} from '@storybook/addon-docs/blocks'
import { expect, userEvent, within, waitFor } from 'storybook/test'

import { DropdownMenu } from '@/components/overlay/dropdown-menu'
import { Button } from '@/components/actions/button'
import ChevronDownIcon from '@resources/asset/ChevronDownIcon.svg?react'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import InfoIcon from '@resources/asset/InfoIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'
import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

const ACCESSIBILITY_DESCRIPTION = md /* language=markdown */ `
## Accessibility

| Prop / Attribute                     | Required | Type      | Notes                                                                                        |
| ------------------------------------ | -------- | --------- | -------------------------------------------------------------------------------------------- |
| Trigger (focusable element)          | ✅ Yes   | —         | Pass your own \`Button\` or \`IconButton\` as \`children\` of \`DropdownMenu.Trigger\`.              |
| \`shortcut\` on \`DropdownMenu.Item\`    | No       | \`string\`  | Purely decorative — wire actual \`keydown\` handlers in your application.                      |
| \`destructive\` on \`DropdownMenu.Item\` | No       | \`boolean\` | Applies danger color to visually warn users before an irreversible action.                   |
| \`disabled\` on any item               | No       | \`boolean\` | Marks the item as unavailable; it remains visible and announced by screen readers.           |
| \`modal\` on \`DropdownMenu\`            | No       | \`boolean\` | @default \`true\`. Blocks outside interaction and hides the page with \`aria-hidden\` when open. |

- The menu renders with \`role="menu"\`; items receive \`role="menuitem"\`, \`role="menuitemcheckbox"\`, or \`role="menuitemradio"\` automatically.
- Keyboard navigation is built in: **Enter** / **Space** to open, **Arrow keys** to navigate, **Escape** to close, **Tab** closes and moves focus forward.

**Sub-components**

| Sub-component               | Description                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------ |
| \`DropdownMenu\`              | Root context provider — wraps the entire menu.                                                   |
| \`DropdownMenu.Trigger\`      | The element that opens the menu on click. Pass your own button as \`children\`.                    |
| \`DropdownMenu.Content\`      | The floating panel containing menu items. Handles positioning, animations and keyboard trapping. |
| \`DropdownMenu.Group\`        | Logical grouping of related items with no visual separator.                                      |
| \`DropdownMenu.Item\`         | A single actionable item with optional \`startIcon\`, \`endIcon\`, and \`shortcut\` hint.              |
| \`DropdownMenu.CheckboxItem\` | A toggleable item that renders a checkmark indicator when \`checked\`.                             |
| \`DropdownMenu.RadioGroup\`   | Container for mutually exclusive radio items; holds the current \`value\`.                         |
| \`DropdownMenu.RadioItem\`    | A single radio option inside a \`DropdownMenu.RadioGroup\`.                                        |
| \`DropdownMenu.Label\`        | Non-interactive section heading used to name a group of items.                                   |
| \`DropdownMenu.Separator\`    | A horizontal dividing line between sections.                                                     |
| \`DropdownMenu.Sub\`          | Root for a nested sub-menu.                                                                      |
| \`DropdownMenu.SubTrigger\`   | An item that reveals the nested sub-menu on hover or keyboard focus.                             |
| \`DropdownMenu.SubContent\`   | The floating panel for the nested sub-menu content.                                              |
`

const DropdownMenuDocsPage = () => (
    <>
        <Title />
        <Description />
        <Canvas />
        <Controls />
        <Markdown>{ACCESSIBILITY_DESCRIPTION}</Markdown>
        <Stories includePrimary={false} />
    </>
)

const meta = {
    title: 'Overlay/DropdownMenu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
        docs: {
            page: DropdownMenuDocsPage,
            description: {
                component: md /* language=markdown */ `
<!--suppress HtmlUnknownAttribute -->

A fully composable dropdown menu built on top of \`@base-ui/react/menu\`.
It supports regular items with icons and keyboard shortcuts, checkbox items, radio groups, separators, labels, and nested sub-menus.

**Usage**

~~~tsx
<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button label="Options" endIcon={ChevronDownIcon} />
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label label="Account" />
      <DropdownMenu.Item
        label="Profile"
        startIcon={UserIcon}
        shortcut="⇧⌘P"
      />
      <DropdownMenu.Item
        label="Settings"
        startIcon={SearchIcon}
        shortcut="⌘S"
      />
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item
      label="Log out"
      startIcon={CloseIcon}
      destructive
    />
  </DropdownMenu.Content>
</DropdownMenu>
~~~

        `,
            },
        },
    },
    argTypes: {
        modal: { control: 'boolean', table: { category: 'DropdownMenu' } },
        defaultOpen: { control: 'boolean', table: { category: 'DropdownMenu' } },
    },
    args: {
        modal: true,
        defaultOpen: false,
    },
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    parameters: {
        docs: {
            description: {
                story:
          'Interactive playground — this example showcases every available building block: regular items, a nested sub-menu, checkbox items, a radio group, and a destructive item.',
            },
            ...storySource(/* language=tsx */ `
<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button label="Open menu" endIcon={ChevronDownIcon} />
  </DropdownMenu.Trigger>

  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label label="Account" />
      <DropdownMenu.Item label="Profile" startIcon={UserIcon} shortcut="⇧⌘P" />
      <DropdownMenu.Item label="Settings" startIcon={SearchIcon} shortcut="⌘S" />
    </DropdownMenu.Group>

    <DropdownMenu.Separator />

    <DropdownMenu.Item label="Log out" startIcon={CloseIcon} destructive />
  </DropdownMenu.Content>
</DropdownMenu>`),
        },
        a11y: {
            config: {
                rules: [
                    {
                        // Base UI wraps the page in aria-hidden when the menu is open (modal=true),
                        // which causes the trigger button to appear inside an aria-hidden container.
                        // This is intentional Base UI behavior — focus moves into the menu portal.
                        id: 'aria-hidden-focus',
                        enabled: false,
                    },
                ],
            },
        },
    },
    render: (args) => {
        const [showStatus, setShowStatus] = useState(true)
        const [showActivity, setShowActivity] = useState(false)
        const [position, setPosition] = useState('bottom')

        return (
            <DropdownMenu {...args}>
                <DropdownMenu.Trigger>
                    <Button
                        label={'Open menu'}
                        endIcon={ChevronDownIcon}
                    />
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    <DropdownMenu.Group>
                        <DropdownMenu.Label label={'Account'} />
                        <DropdownMenu.Item
                            label={'Profile'}
                            startIcon={UserIcon}
                            shortcut={'⇧⌘P'}
                        />
                        <DropdownMenu.Item
                            label={'Settings'}
                            startIcon={SearchIcon}
                            shortcut={'⌘S'}
                        />
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger
                                label={'SubMenu Right'}
                                startIcon={UserIcon}
                            />
                            <DropdownMenu.SubContent>
                                <DropdownMenu.Item
                                    label={'Email'}
                                    startIcon={SearchIcon}
                                />
                                <DropdownMenu.Item
                                    label={'Message'}
                                    startIcon={InfoIcon}
                                />
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item
                                    label={'More…'}
                                    startIcon={SearchIcon}
                                />
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger
                                label={'SubMenu Left'}
                                startIcon={UserIcon}
                            />
                            <DropdownMenu.SubContent side={'left'}>
                                <DropdownMenu.Label label={'Appearance'} />
                                <DropdownMenu.CheckboxItem
                                    label={'Show status bar'}
                                    checked={showStatus}
                                    onCheckedChange={setShowStatus}
                                />
                                <DropdownMenu.CheckboxItem
                                    label={'Show activity bar'}
                                    checked={showActivity}
                                    onCheckedChange={setShowActivity}
                                />
                                <DropdownMenu.Sub>
                                    <DropdownMenu.SubTrigger
                                        label={'SubMenu Left'}
                                        startIcon={UserIcon}
                                    />
                                    <DropdownMenu.SubContent side={'left'}>
                                        <DropdownMenu.Label label={'Appearance'} />
                                        <DropdownMenu.CheckboxItem
                                            label={'Show status bar'}
                                            checked={showStatus}
                                            onCheckedChange={setShowStatus}
                                        />
                                        <DropdownMenu.CheckboxItem
                                            label={'Show activity bar'}
                                            checked={showActivity}
                                            onCheckedChange={setShowActivity}
                                        />
                                        <DropdownMenu.Sub>
                                            <DropdownMenu.SubTrigger
                                                label={'SubMenu Right'}
                                                startIcon={UserIcon}
                                            />
                                            <DropdownMenu.SubContent side={'right'}>
                                                <DropdownMenu.Label label={'Appearance'} />
                                                <DropdownMenu.CheckboxItem
                                                    label={'Show status bar'}
                                                    checked={showStatus}
                                                    onCheckedChange={setShowStatus}
                                                />
                                                <DropdownMenu.CheckboxItem
                                                    label={'Show activity bar'}
                                                    checked={showActivity}
                                                    onCheckedChange={setShowActivity}
                                                />
                                            </DropdownMenu.SubContent>
                                        </DropdownMenu.Sub>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Sub>
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Sub>
                        <DropdownMenu.Item
                            label={'API (unavailable)'}
                            startIcon={InfoIcon}
                            disabled
                        />
                    </DropdownMenu.Group>

                    <DropdownMenu.Separator />
                    <DropdownMenu.Group>
                        <DropdownMenu.Label label={'Appearance'} />
                        <DropdownMenu.CheckboxItem
                            label={'Show status bar'}
                            checked={showStatus}
                            onCheckedChange={setShowStatus}
                        />
                        <DropdownMenu.CheckboxItem
                            label={'Show activity bar'}
                            checked={showActivity}
                            onCheckedChange={setShowActivity}
                        />
                    </DropdownMenu.Group>

                    <DropdownMenu.Separator />
                    <DropdownMenu.RadioGroup
                        value={position}
                        onValueChange={(value) => setPosition(value)}
                    >
                        <DropdownMenu.Label label={'Panel position'} />
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

                    <DropdownMenu.Separator />
                    <DropdownMenu.Group>
                        <DropdownMenu.Item
                            label={'Delete (unavailable)'}
                            startIcon={TrashIcon}
                            shortcut={'⌫'}
                            destructive
                            disabled
                        />
                        <DropdownMenu.Item
                            label={'Log out'}
                            startIcon={CloseIcon}
                            destructive
                        />
                    </DropdownMenu.Group>
                </DropdownMenu.Content>
            </DropdownMenu>
        )
    },
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
