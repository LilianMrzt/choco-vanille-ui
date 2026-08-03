import { addIcon } from '@iconify/react'
import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'

// Register every Iconify icon used by DrawerItemContent and RotatingChevron.
beforeAll(() => {
    addIcon('lucide:home', {
        body: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:star', {
        body: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        width: 24,
        height: 24,
    })
    // RotatingChevron uses lucide:chevron-down
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('DrawerItemContent', () => {
    describe('default rendering', () => {
        it('renders the label text', () => {
            render(
                <DrawerItemContent
                    label={'Dashboard'}
                    startIcon={'lucide:home'}
                />,
            )
            expect(screen.getByText('Dashboard')).toBeTruthy()
        })

        it('renders a start icon as an SVG element', () => {
            render(
                <DrawerItemContent
                    label={'Dashboard'}
                    startIcon={'lucide:home'}
                />,
            )
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders trailing content', () => {
            render(
                <DrawerItemContent
                    label={'Inbox'}
                    startIcon={'lucide:home'}
                    trailing={<span data-testid={'badge'}>3</span>}
                />,
            )
            expect(screen.getByTestId('badge')).toBeTruthy()
            expect(screen.getByTestId('badge').textContent).toBe('3')
        })

        it('does not render a chevron when endChevronIcon is false', () => {
            render(
                <DrawerItemContent
                    label={'Item'}
                    startIcon={'lucide:home'}
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
                    startIcon={'lucide:home'}
                    endChevronIcon={true}
                />,
            )
            // Two SVGs: start icon + rotating chevron.
            expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(2)
        })
    })

    describe('content visibility state', () => {
        it('sets data-state="open" on the content span by default (drawer is open)', () => {
            render(
                <DrawerItemContent
                    label={'Item'}
                    startIcon={'lucide:home'}
                />,
            )
            // useDrawerItemState fallback defaults to open:true → state="open"
            const span = screen.getByText('Item').closest('[data-state]') as HTMLElement
            expect(span.getAttribute('data-state')).toBe('open')
        })

        it('does not mark content as aria-hidden when drawer is open', () => {
            render(
                <DrawerItemContent
                    label={'Item'}
                    startIcon={'lucide:home'}
                />,
            )
            const span = screen.getByText('Item').closest('[data-state]') as HTMLElement
            // aria-hidden is only truthy when state === "closed"
            expect(span.getAttribute('aria-hidden')).not.toBe('true')
        })
    })

    describe('expanded chevron', () => {
        it('passes expanded=false to the rotating chevron by default', () => {
            render(
                <DrawerItemContent
                    label={'Section'}
                    startIcon={'lucide:home'}
                    endChevronIcon={true}
                    expanded={false}
                />,
            )
            // RotatingChevron sets data-expanded on the SVG wrapper
            const chevronIcon = document.querySelector('[data-expanded]') as HTMLElement
            expect(chevronIcon).toBeTruthy()
            expect(chevronIcon.getAttribute('data-expanded')).toBe('false')
        })

        it('passes expanded=true to the rotating chevron when expanded', () => {
            render(
                <DrawerItemContent
                    label={'Section'}
                    startIcon={'lucide:home'}
                    endChevronIcon={true}
                    expanded={true}
                />,
            )
            const chevronIcon = document.querySelector('[data-expanded]') as HTMLElement
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
