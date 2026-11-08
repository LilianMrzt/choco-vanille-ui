import { CIRCLE_ICON as CircleIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { BottomNavigation } from '@components/navigation/bottom-navigation'

describe('BottomNavigationItem', () => {
    it('renders links and buttons with their labels and icons', () => {
        render(
            <BottomNavigation aria-label={'Primary navigation'} defaultValue={'home'}>
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'home'}
                        label={'Home'}
                        icon={CircleIcon}
                        href={'/'}
                    />
                    <BottomNavigation.Item
                        value={'settings'}
                        label={'Settings'}
                        icon={CircleIcon}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Settings' })).toBeTruthy()
        expect(screen.queryAllByRole('img')).toHaveLength(0)
    })

    it('forwards a button selection to the navigation root', async () => {
        const onValueChange = vi.fn()

        render(
            <BottomNavigation
                aria-label={'Primary navigation'}
                onValueChange={onValueChange}
            >
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'settings'}
                        label={'Settings'}
                        icon={CircleIcon}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Settings' }))

        expect(onValueChange).toHaveBeenCalledWith('settings')
    })

    it('prevents native navigation when a link has an onClick handler', async () => {
        const onClick = vi.fn()

        render(
            <BottomNavigation aria-label={'Primary navigation'}>
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'home'}
                        label={'Home'}
                        icon={CircleIcon}
                        href={'/home'}
                        onClick={onClick}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        const link = screen.getByRole('link', { name: 'Home' })
        await userEvent.click(link)

        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick.mock.calls[0]?.[0]?.defaultPrevented).toBe(true)
        expect(link.getAttribute('href')).toBe('/home')
    })

    it('supports icon-only items with an accessible name', () => {
        render(
            <BottomNavigation
                aria-label={'Primary navigation'}
                defaultValue={'home'}
            >
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'home'}
                        aria-label={'Home'}
                        icon={CircleIcon}
                        href={'/'}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        expect(screen.getByRole('link', { name: 'Home' })).toBeTruthy()
        expect(screen.queryByText('Home')).toBeNull()
    })

    it('applies a custom height to the control', () => {
        render(
            <BottomNavigation aria-label={'Primary navigation'}>
                <BottomNavigation.List>
                    <BottomNavigation.Item
                        value={'home'}
                        label={'Home'}
                        icon={CircleIcon}
                        height={'4rem'}
                    />
                </BottomNavigation.List>
            </BottomNavigation>,
        )

        expect(
            (screen.getByRole('button', { name: 'Home' }) as HTMLButtonElement)
                .style.height,
        ).toBe('4rem')
    })
})
