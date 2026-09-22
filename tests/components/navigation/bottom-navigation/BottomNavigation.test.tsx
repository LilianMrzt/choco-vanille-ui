import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
    BOTTOM_NAVIGATION_STYLES,
    BottomNavigation,
} from '@components/navigation/bottom-navigation'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

type TestNavigationProps = Omit<
  React.ComponentProps<typeof BottomNavigation>,
  'aria-label' | 'children'
>;

const TestNavigation = (props: TestNavigationProps) => (
    <BottomNavigation {...props} aria-label={'Primary navigation'}>
        <BottomNavigation.List>
            <BottomNavigation.Item
                value={'home'}
                label={'Home'}
                icon={CircleIcon}
                href={'/'}
            />
            <BottomNavigation.Item
                value={'search'}
                label={'Search'}
                icon={SearchIcon}
            />
            <BottomNavigation.Item
                value={'profile'}
                label={'Profile'}
                icon={UserIcon}
                disabled
            />
        </BottomNavigation.List>
    </BottomNavigation>
)

describe('BottomNavigation', () => {
    it('renders a named navigation landmark with list items', () => {
        render(<TestNavigation defaultValue={'home'} />)

        expect(
            screen.getByRole('navigation', { name: 'Primary navigation' }),
        ).toBeTruthy()
        expect(screen.getByRole('list')).toBeTruthy()
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
        expect(
            screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
        ).toBe('page')
    })

    it('selects an item in uncontrolled mode', async () => {
        render(<TestNavigation defaultValue={'home'} />)

        await userEvent.click(screen.getByRole('button', { name: 'Search' }))

        expect(
            screen
                .getByRole('button', { name: 'Search' })
                .getAttribute('aria-current'),
        ).toBe('page')
        expect(
            screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
        ).toBeNull()
    })

    it('forwards selected values in controlled mode', async () => {
        const onValueChange = vi.fn()

        render(<TestNavigation value={'home'} onValueChange={onValueChange} />)

        await userEvent.click(screen.getByRole('button', { name: 'Search' }))

        expect(onValueChange).toHaveBeenCalledWith('search')
        expect(
            screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
        ).toBe('page')
    })

    it('does not select disabled items', async () => {
        const onValueChange = vi.fn()

        render(
            <TestNavigation defaultValue={'home'} onValueChange={onValueChange} />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Profile' }))

        expect(onValueChange).not.toHaveBeenCalled()
        expect(
            screen.getByRole('link', { name: 'Home' }).getAttribute('aria-current'),
        ).toBe('page')
        expect(
            (screen.getByRole('button', { name: 'Profile' }) as HTMLButtonElement)
                .disabled,
        ).toBe(true)
    })

    it('forwards refs to the root, list, and item controls', () => {
        const rootRef = createRef<HTMLElement>()
        const listRef = createRef<HTMLUListElement>()
        const itemRef = createRef<HTMLAnchorElement>()

        render(
            <BottomNavigation ref={rootRef} aria-label={'Primary navigation'}>
                <BottomNavigation.List ref={listRef}>
                    <BottomNavigation.Item
                        ref={itemRef}
                        value={'home'}
                        label={'Home'}
                        icon={CircleIcon}
                        href={'/'}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        expect(rootRef.current).toBeInstanceOf(HTMLElement)
        expect(listRef.current).toBeInstanceOf(HTMLUListElement)
        expect(itemRef.current).toBeInstanceOf(HTMLAnchorElement)
    })

    it('adds the optional top border class', () => {
        render(
            <BottomNavigation
                aria-label={'Primary navigation'}
                bordered
            >
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'home'}
                        label={'Home'}
                        icon={CircleIcon}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        expect(screen.getByRole('navigation').className).toContain(
            BOTTOM_NAVIGATION_STYLES.bordered,
        )
    })

    it('exposes compound display names', () => {
        expect(BottomNavigation.displayName).toBe('BottomNavigation')
        expect(BottomNavigation.List.displayName).toBe('BottomNavigation.List')
        expect(BottomNavigation.Item.displayName).toBe('BottomNavigation.Item')
    })
})
