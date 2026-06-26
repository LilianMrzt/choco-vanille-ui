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

// Meta

const meta = {
    title: 'Overlay/DropdownMenu',
    component: DropdownMenu,
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <Flex align={'start'} justify={'center'} pt={'2xl'} style={{ minHeight: '16rem' }}>
                <Story />
            </Flex>
        ),
    ],
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

// All features — single story showcasing every building block

export const Default: Story = {
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
