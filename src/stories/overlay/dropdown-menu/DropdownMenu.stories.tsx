import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within, waitFor } from 'storybook/test'
import { Icon } from '@/components/foundation/icon'
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

//  Meta

const meta = {
    title: 'Overlay/DropdownMenu',
    component: DropdownMenu,
    parameters: { layout: 'centered' },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '16rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '2rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

//  Default

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
                <DropdownMenuLabel>{'My Account'}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem
                        startIcon={<Icon icon={'mdi:account-outline'} />}
                        shortcut={'⇧⌘P'}
                    >
                        {'Profile'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        startIcon={<Icon icon={'mdi:credit-card-outline'} />}
                        shortcut={'⌘B'}
                    >
                        {'Billing'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        startIcon={<Icon icon={'mdi:cog-outline'} />}
                        shortcut={'⌘S'}
                    >
                        {'Settings'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        startIcon={<Icon icon={'mdi:keyboard-outline'} />}
                        shortcut={'⌘K'}
                    >
                        {'Keyboard shortcuts'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem startIcon={<Icon icon={'mdi:account-group-outline'} />}>
                        {'Team'}
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger startIcon={<Icon icon={'mdi:account-plus-outline'} />}>
                            {'Invite users'}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem startIcon={<Icon icon={'mdi:email-outline'} />}>
                                {'Email'}
                            </DropdownMenuItem>
                            <DropdownMenuItem startIcon={<Icon icon={'mdi:message-outline'} />}>
                                {'Message'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem startIcon={<Icon icon={'mdi:dots-horizontal'} />}>
                                {'More…'}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuItem
                        startIcon={<Icon icon={'mdi:plus'} />}
                        shortcut={'⌘+T'}
                    >
                        {'New team'}
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem startIcon={<Icon icon={'mdi:github'} />}>
                    {'GitHub'}
                </DropdownMenuItem>
                <DropdownMenuItem startIcon={<Icon icon={'mdi:lifebuoy'} />}>
                    {'Support'}
                </DropdownMenuItem>
                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:cloud-off-outline'} />}
                    disabled
                >
                    {'API (unavailable)'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:logout'} />}
                    shortcut={'⇧⌘Q'}
                    destructive
                >
                    {'Log out'}
                </DropdownMenuItem>
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

//  Checkboxes

export const WithCheckboxItems: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    label={'View options'}
                    variant={'outlined'}
                    endIcon={'mdi:tune'}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>{'Appearance'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                    {'Show status bar'}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false}>
                    {'Show activity bar'}
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={false}>
                    {'Show panel'}
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
}

//  Radio group

export const WithRadioItems: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    label={'Change position'}
                    variant={'outlined'}
                    endIcon={'mdi:chevron-down'}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>{'Panel position'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={'bottom'}>
                    <DropdownMenuRadioItem value={'top'}>{'Top'}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={'bottom'}>{'Bottom'}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={'right'}>{'Right'}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
}

//  Destructive actions

export const WithDestructiveItems: Story = {
    render: () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    label={'Actions'}
                    color={'destructive'}
                    variant={'outlined'}
                    endIcon={'mdi:chevron-down'}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:pencil-outline'} />}
                    shortcut={'⌘E'}
                >
                    {'Rename'}
                </DropdownMenuItem>
                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:content-copy'} />}
                    shortcut={'⌘D'}
                >
                    {'Duplicate'}
                </DropdownMenuItem>
                <DropdownMenuItem startIcon={<Icon icon={'mdi:archive-outline'} />}>
                    {'Archive'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:trash-can-outline'} />}
                    shortcut={'⌫'}
                    destructive
                >
                    {'Delete'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
}

//  Disabled items

export const WithDisabledItems: Story = {
    render: () => (
        <DropdownMenu defaultOpen>
            <DropdownMenuTrigger asChild>
                <Button
                    label={'Options'}
                    variant={'ghost'}
                    endIcon={'mdi:chevron-down'}
                />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuItem startIcon={<Icon icon={'mdi:eye-outline'} />}>
                    {'View'}
                </DropdownMenuItem>
                <DropdownMenuItem startIcon={<Icon icon={'mdi:pencil-outline'} />}>
                    {'Edit'}
                </DropdownMenuItem>
                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:share-outline'} />}
                    disabled
                >
                    {'Share (unavailable)'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    startIcon={<Icon icon={'mdi:trash-can-outline'} />}
                    destructive
                    disabled
                >
                    {'Delete (unavailable)'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ),
}
