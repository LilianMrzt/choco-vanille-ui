import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@components/actions/button'
import { Command } from '@components/overlay/command/Command.tsx'

describe('Command', () => {
    describe('compound components', () => {
        it('exposes all sub-components', () => {
            expect(Command.Trigger).toBeDefined()
            expect(Command.Content).toBeDefined()
            expect(Command.Input).toBeDefined()
            expect(Command.List).toBeDefined()
            expect(Command.Group).toBeDefined()
            expect(Command.Item).toBeDefined()
            expect(Command.Empty).toBeDefined()
            expect(Command.Separator).toBeDefined()
        })

        it('displayName is set to "Command"', () => {
            expect(Command.displayName).toBe('Command')
        })
    })

    describe('default rendering', () => {
        it('renders a command palette with Input, List and Items when open', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List aria-label={'Commands'}>
                            <Command.Group label={'Actions'}>
                                <Command.Item onSelect={() => {}}>Edit profile</Command.Item>
                                <Command.Item onSelect={() => {}}>Settings</Command.Item>
                            </Command.Group>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            expect(screen.getByRole('combobox')).toBeTruthy()
            expect(screen.getByRole('listbox')).toBeTruthy()
            expect(screen.getByText('Edit profile')).toBeTruthy()
            expect(screen.getByText('Settings')).toBeTruthy()
        })

        it('renders the group label', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Group label={'My group'}>
                                <Command.Item>Item</Command.Item>
                            </Command.Group>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            expect(screen.getByText('My group')).toBeTruthy()
        })

        it('renders the separator', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>A</Command.Item>
                            <Command.Separator data-testid={'sep'} />
                            <Command.Item>B</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            expect(screen.getByTestId('sep')).toBeTruthy()
        })
    })

    describe('interactions', () => {
        it('opens the command palette when the trigger is clicked', async () => {
            render(
                <Command>
                    <Command.Trigger>
                        <Button label={'Open'} />
                    </Command.Trigger>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>Edit profile</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            expect(screen.queryByRole('dialog')).toBeNull()

            await userEvent.click(screen.getByText('Open'))

            expect(screen.getByRole('dialog')).toBeTruthy()
        })

        it('closes the command palette with Escape', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            expect(screen.getByRole('dialog')).toBeTruthy()

            await userEvent.keyboard('{Escape}')

            expect(screen.queryByRole('dialog')).toBeNull()
        })

        it('filters items as the user types', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List>
                            <Command.Item>Edit profile</Command.Item>
                            <Command.Item>Settings</Command.Item>
                            <Command.Item>Go to dashboard</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.type(screen.getByRole('combobox'), 'edit')

            // getAllByRole({ hidden: true }) returns every DOM node with the role,
            // letting us assert the hidden attribute directly rather than relying on
            // the accessibility-tree exclusion that getAllByRole performs by default.
            const allItems = screen.getAllByRole('option', { hidden: true })
            expect(allItems).toHaveLength(3)

            const visibleItems = allItems.filter((el) => !el.hasAttribute('hidden'))
            const hiddenItems = allItems.filter((el) => el.hasAttribute('hidden'))

            expect(visibleItems).toHaveLength(1)
            expect(visibleItems[0].textContent?.trim()).toContain('Edit profile')
            expect(hiddenItems).toHaveLength(2)
            expect(hiddenItems.some((el) => el.textContent?.includes('Settings'))).toBe(true)
            expect(hiddenItems.some((el) => el.textContent?.includes('Go to dashboard'))).toBe(true)
        })

        it('matches items against the keywords prop when children is a string', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List>
                            <Command.Item keywords={['profile', 'account']}>Edit</Command.Item>
                            <Command.Item>Settings</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            // 'profile' matches the keyword of the first item but not 'Settings'
            await userEvent.type(screen.getByRole('combobox'), 'profile')

            const allItems = screen.getAllByRole('option', { hidden: true })
            expect(allItems.filter((el) => !el.hasAttribute('hidden'))).toHaveLength(1)
            expect(allItems.filter((el) => el.hasAttribute('hidden'))).toHaveLength(1)
            expect(allItems.find((el) => !el.hasAttribute('hidden'))?.textContent?.trim()).toContain('Edit')
        })

        it('calls onSelect when an item is clicked', async () => {
            const onSelect = vi.fn()

            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item onSelect={onSelect}>Edit profile</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByText('Edit profile'))

            expect(onSelect).toHaveBeenCalledOnce()
        })

        it('does not call onSelect when a disabled item is clicked', async () => {
            const onSelect = vi.fn()

            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item onSelect={onSelect} disabled>
                                Delete account
                            </Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByText('Delete account'))

            expect(onSelect).not.toHaveBeenCalled()
        })

        it('calls onOpenChange when the dialog state changes', async () => {
            const onOpenChange = vi.fn()

            render(
                <Command defaultOpen onOpenChange={onOpenChange}>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.keyboard('{Escape}')

            expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
        })
    })

    describe('keyboard navigation', () => {
        it('highlights the first item on ArrowDown', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(true)
            expect(items[1].hasAttribute('data-highlighted')).toBe(false)
        })

        it('cycles through items with ArrowDown', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(false)
            expect(items[1].hasAttribute('data-highlighted')).toBe(true)
        })

        it('wraps around from last to first item with ArrowDown', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(true)
        })

        it('activates the highlighted item on Enter', async () => {
            const onSelect = vi.fn()

            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item onSelect={onSelect}>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{Enter}')

            expect(onSelect).toHaveBeenCalledOnce()
        })

        it('skips disabled items during ArrowDown navigation', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item disabled>Disabled</Command.Item>
                            <Command.Item>Third</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(false)
            expect(items[1].hasAttribute('data-highlighted')).toBe(false)
            expect(items[2].hasAttribute('data-highlighted')).toBe(true)
        })

        it('highlights the last item on ArrowUp when no item is highlighted', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowUp}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(false)
            expect(items[1].hasAttribute('data-highlighted')).toBe(true)
        })

        it('navigates to the previous item with ArrowUp', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Item>Third</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')
            // Now on Third; go back one step
            await userEvent.keyboard('{ArrowUp}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(false)
            expect(items[1].hasAttribute('data-highlighted')).toBe(true)
            expect(items[2].hasAttribute('data-highlighted')).toBe(false)
        })

        it('wraps around from first to last item with ArrowUp', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            // First is now highlighted; pressing ArrowUp should wrap to last
            await userEvent.keyboard('{ArrowUp}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(false)
            expect(items[1].hasAttribute('data-highlighted')).toBe(true)
        })

        it('skips disabled items during ArrowUp navigation', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item disabled>Disabled</Command.Item>
                            <Command.Item>Third</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            // Start at Third via End, then go back — should skip Disabled
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')
            // Now at Third; ArrowUp should skip Disabled and land on First
            await userEvent.keyboard('{ArrowUp}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(true)
            expect(items[1].hasAttribute('data-highlighted')).toBe(false)
            expect(items[2].hasAttribute('data-highlighted')).toBe(false)
        })

        it('highlights the first item on Home', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Item>Third</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')
            await userEvent.keyboard('{ArrowDown}')
            // Now on Third; Home should jump back to First
            await userEvent.keyboard('{Home}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(true)
            expect(items[1].hasAttribute('data-highlighted')).toBe(false)
            expect(items[2].hasAttribute('data-highlighted')).toBe(false)
        })

        it('highlights the last item on End', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Item>Third</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{End}')

            const items = screen.getAllByRole('option')
            expect(items[0].hasAttribute('data-highlighted')).toBe(false)
            expect(items[1].hasAttribute('data-highlighted')).toBe(false)
            expect(items[2].hasAttribute('data-highlighted')).toBe(true)
        })

        it('Home skips leading disabled items', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item disabled>Disabled first</Command.Item>
                            <Command.Item>First enabled</Command.Item>
                            <Command.Item>Second enabled</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{Home}')

            // getAllByRole with hidden:true to include the disabled item in the query
            const allItems = screen.getAllByRole('option', { hidden: true })
            expect(allItems[0].hasAttribute('data-highlighted')).toBe(false)
            expect(allItems[1].hasAttribute('data-highlighted')).toBe(true)
            expect(allItems[2].hasAttribute('data-highlighted')).toBe(false)
        })

        it('End skips trailing disabled items', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First enabled</Command.Item>
                            <Command.Item>Second enabled</Command.Item>
                            <Command.Item disabled>Disabled last</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.click(screen.getByRole('combobox'))
            await userEvent.keyboard('{End}')

            const allItems = screen.getAllByRole('option', { hidden: true })
            expect(allItems[0].hasAttribute('data-highlighted')).toBe(false)
            expect(allItems[1].hasAttribute('data-highlighted')).toBe(true)
            expect(allItems[2].hasAttribute('data-highlighted')).toBe(false)
        })

        it('items have tabIndex -1 so focus stays on the combobox input', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Item disabled>Disabled</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            const allItems = screen.getAllByRole('option', { hidden: true })
            allItems.forEach((item) => {
                expect(item.getAttribute('tabindex')).toBe('-1')
            })
        })
    })

    describe('clear button', () => {
        it('clear button is not shown when search is empty', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull()
        })

        it('clear button appears after typing', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.type(screen.getByRole('combobox'), 'it')

            expect(screen.getByRole('button', { name: 'Clear search' })).toBeTruthy()
        })

        it('clicking the clear button resets the search and hides the button', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>Edit profile</Command.Item>
                            <Command.Item>Settings</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            const input = screen.getByRole('combobox')
            await userEvent.type(input, 'edit')

            // After typing, one item matches and one is explicitly hidden via the
            // [hidden] attribute.
            const allBefore = screen.getAllByRole('option', { hidden: true })
            expect(allBefore.filter((el) => !el.hasAttribute('hidden'))).toHaveLength(1)
            expect(allBefore.filter((el) => el.hasAttribute('hidden'))).toHaveLength(1)

            await userEvent.click(screen.getByRole('button', { name: 'Clear search' }))

            expect((input as HTMLInputElement).value).toBe('')
            expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull()

            // After clearing, no item has the [hidden] attribute.
            const allAfter = screen.getAllByRole('option', { hidden: true })
            expect(allAfter.filter((el) => el.hasAttribute('hidden'))).toHaveLength(0)
            expect(allAfter.filter((el) => !el.hasAttribute('hidden'))).toHaveLength(2)
        })

        it('calls onClear when the clear button is clicked', async () => {
            const onClear = vi.fn()

            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input onClear={onClear} />
                        <Command.List>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.type(screen.getByRole('combobox'), 'it')
            await userEvent.click(screen.getByRole('button', { name: 'Clear search' }))

            expect(onClear).toHaveBeenCalledOnce()
        })

        it('clear button aria-label is overridable via defaultClearAriaLabel', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input defaultClearAriaLabel={'Effacer la recherche'} />
                        <Command.List>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.type(screen.getByRole('combobox'), 'it')

            expect(screen.getByRole('button', { name: 'Effacer la recherche' })).toBeTruthy()
        })
    })

    describe('group visibility during filtering', () => {
        it('hides the group when none of its items match the search query', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List>
                            <Command.Group label={'Actions'}>
                                <Command.Item>Edit profile</Command.Item>
                                <Command.Item>Settings</Command.Item>
                            </Command.Group>
                            <Command.Group label={'Navigation'}>
                                <Command.Item>Go to dashboard</Command.Item>
                            </Command.Group>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            // 'dashboard' matches only the Navigation group
            await userEvent.type(screen.getByRole('combobox'), 'dashboard')

            const allGroups = screen.getAllByRole('group', { hidden: true })

            // Actions group has no matching items — it must carry the hidden attribute
            const actionsGroup = allGroups.find((g) => g.textContent?.includes('Actions'))
            expect(actionsGroup).toBeDefined()
            expect(actionsGroup?.hasAttribute('hidden')).toBe(true)

            // Navigation group has a matching item — it must remain visible
            const navigationGroup = allGroups.find((g) => g.textContent?.includes('Navigation'))
            expect(navigationGroup).toBeDefined()
            expect(navigationGroup?.hasAttribute('hidden')).toBe(false)
        })

        it('keeps the group visible when at least one item matches', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List>
                            <Command.Group label={'Actions'}>
                                <Command.Item>Edit profile</Command.Item>
                                <Command.Item>Settings</Command.Item>
                                <Command.Item>Logout</Command.Item>
                            </Command.Group>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            // Only 'Settings' matches 'set'
            await userEvent.type(screen.getByRole('combobox'), 'set')

            const groups = screen.getAllByRole('group', { hidden: true })
            const group = groups.find((g) => g.textContent?.includes('Actions'))
            expect(group).toBeDefined()
            expect(group?.hasAttribute('hidden')).toBe(false)
        })

        it('reveals the group again after the search is cleared', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List>
                            <Command.Group label={'Actions'}>
                                <Command.Item>Edit profile</Command.Item>
                            </Command.Group>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            // Filter out all items in the group
            await userEvent.type(screen.getByRole('combobox'), 'xyz')

            const groupsBefore = screen.getAllByRole('group', { hidden: true })
            const groupBefore = groupsBefore.find((g) => g.textContent?.includes('Actions'))
            expect(groupBefore?.hasAttribute('hidden')).toBe(true)

            // Clear the input — the group must become visible again
            await userEvent.clear(screen.getByRole('combobox'))

            const groupsAfter = screen.getAllByRole('group', { hidden: true })
            const groupAfter = groupsAfter.find((g) => g.textContent?.includes('Actions'))
            expect(groupAfter?.hasAttribute('hidden')).toBe(false)
        })

        it('group label is not in the accessibility tree when its items are filtered out', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input placeholder={'Search…'} />
                        <Command.List>
                            <Command.Group label={'Actions'}>
                                <Command.Item>Edit profile</Command.Item>
                            </Command.Group>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            // Before filtering, the group is accessible
            expect(screen.getByRole('group')).toBeTruthy()

            // Type a query that matches nothing
            await userEvent.type(screen.getByRole('combobox'), 'xyz')

            // With hidden attribute set, the group is excluded from the accessible tree
            expect(screen.queryByRole('group')).toBeNull()
        })
    })

    describe('accessibility', () => {
        it('input has role="combobox" with aria-controls pointing to the listbox', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List aria-label={'Commands'}>
                            <Command.Item>Item</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            const input = screen.getByRole('combobox')
            const list = screen.getByRole('listbox')

            expect(input.getAttribute('aria-controls')).toBe(list.id)
            expect(input.getAttribute('aria-expanded')).toBe('true')
        })

        it('input aria-activedescendant matches the highlighted item id', async () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item>First</Command.Item>
                            <Command.Item>Second</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            await userEvent.keyboard('{ArrowDown}')

            const input = screen.getByRole('combobox')
            const activeId = input.getAttribute('aria-activedescendant')

            expect(activeId).toBeTruthy()
            const activeItem = document.getElementById(activeId!)
            expect(activeItem?.textContent?.trim()).toContain('First')
        })

        it('disabled items have aria-disabled attribute', () => {
            render(
                <Command defaultOpen>
                    <Command.Content>
                        <Command.Input />
                        <Command.List>
                            <Command.Item disabled>Disabled</Command.Item>
                            <Command.Empty>No results.</Command.Empty>
                        </Command.List>
                    </Command.Content>
                </Command>,
            )

            const disabledItem = screen.getByText('Disabled').closest('[role="option"]')
            expect(disabledItem?.getAttribute('aria-disabled')).toBe('true')
        })
    })
})
