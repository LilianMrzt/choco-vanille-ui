import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

describe('DrawerItemContent', () => {
    describe('default rendering', () => {
        it('renders the label text', () => {
            render(<DrawerItemContent label={'Dashboard'} startIcon={UserIcon} />)
            expect(screen.getByText('Dashboard')).toBeTruthy()
        })

        it('renders a start icon as an SVG element', () => {
            render(<DrawerItemContent label={'Dashboard'} startIcon={UserIcon} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders trailing content', () => {
            render(
                <DrawerItemContent
                    label={'Inbox'}
                    startIcon={UserIcon}
                    trailing={<span data-testid={'badge'}>3</span>}
                />,
            )
            expect(screen.getByTestId('badge')).toBeTruthy()
            expect(screen.getByTestId('badge').textContent).toBe('3')
        })

        it('renders an end icon', () => {
            render(
                <DrawerItemContent
                    label={'Next'}
                    startIcon={UserIcon}
                    endIcon={ChevronRightIcon}
                />,
            )

            expect(document.querySelectorAll('svg')).toHaveLength(2)
        })

        it('does not render a chevron when endChevronIcon is false', () => {
            render(
                <DrawerItemContent
                    label={'Item'}
                    startIcon={UserIcon}
                    endChevronIcon={false}
                />,
            )
            // Only one SVG — the start icon; no chevron.
            expect(document.querySelectorAll('svg')).toHaveLength(1)
        })

        it('renders an end chevron icon when endChevronIcon is true', () => {
            render(
                <DrawerItemContent
                    label={'Section'}
                    startIcon={UserIcon}
                    endChevronIcon={true}
                />,
            )
            // Two SVGs: start icon + rotating chevron.
            expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2)
        })
    })

    describe('content visibility state', () => {
        it('sets data-state="open" on the content span by default (drawer is open)', () => {
            render(<DrawerItemContent label={'Item'} startIcon={UserIcon} />)
            // useDrawerItemState fallback defaults to open:true → state="open"
            const span = screen
                .getByText('Item')
                .closest('[data-state]') as HTMLElement
            expect(span.getAttribute('data-state')).toBe('open')
        })

        it('does not mark content as aria-hidden when drawer is open', () => {
            render(<DrawerItemContent label={'Item'} startIcon={UserIcon} />)
            const span = screen
                .getByText('Item')
                .closest('[data-state]') as HTMLElement
            // aria-hidden is only truthy when state === "closed"
            expect(span.getAttribute('aria-hidden')).not.toBe('true')
        })
    })

    describe('expanded chevron', () => {
        it('passes expanded=false to the rotating chevron by default', () => {
            render(
                <DrawerItemContent
                    label={'Section'}
                    startIcon={UserIcon}
                    endChevronIcon={true}
                    expanded={false}
                />,
            )
            // RotatingChevron sets data-expanded on the SVG wrapper
            const chevronIcon = document.querySelector(
                '[data-expanded]',
            ) as HTMLElement
            expect(chevronIcon).toBeTruthy()
            expect(chevronIcon.getAttribute('data-expanded')).toBe('false')
        })

        it('passes expanded=true to the rotating chevron when expanded', () => {
            render(
                <DrawerItemContent
                    label={'Section'}
                    startIcon={UserIcon}
                    endChevronIcon={true}
                    expanded={true}
                />,
            )
            const chevronIcon = document.querySelector(
                '[data-expanded]',
            ) as HTMLElement
            expect(chevronIcon).toBeTruthy()
            expect(chevronIcon.getAttribute('data-expanded')).toBe('true')
        })
    })

    describe('displayName', () => {
        it('is set to "DrawerItemContent"', () => {
            expect(DrawerItemContent.displayName).toBe('DrawerItemContent')
        })
    })
})
