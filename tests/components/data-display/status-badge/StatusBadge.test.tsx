import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
    STATUS_BADGE_STYLES,
    StatusBadge,
    type StatusBadgePosition,
    type StatusBadgeSize,
} from '@components/data-display/status-badge'
import type { BadgeColor } from '@components/data-display/badge'

const COLORS: BadgeColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'destructive',
    'success',
    'warning',
    'info',
    'purple',
    'pink',
    'orange',
    'teal',
    'cyan',
    'indigo',
]

const POSITIONS: StatusBadgePosition[] = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
]

const SIZES: StatusBadgeSize[] = ['sm', 'md', 'lg']

describe('StatusBadge', () => {
    describe('default rendering', () => {
        it('wraps its child in a span and renders an indicator', () => {
            const { container } = render(
                <StatusBadge>
                    <button type={'button'}>Action</button>
                </StatusBadge>,
            )

            expect(container.firstElementChild?.tagName.toLowerCase()).toBe('span')
            expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy()
            expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
        })

        it('defaults to a decorative primary indicator in the top-right corner', () => {
            const { container } = render(
                <StatusBadge>
                    <span>Content</span>
                </StatusBadge>,
            )
            const indicator = container.querySelector('[aria-hidden="true"]')

            expect(indicator?.className).toContain(
                STATUS_BADGE_STYLES.indicator({}),
            )
        })
    })

    describe('color prop', () => {
        it.each(COLORS)('renders color="%s"', (color) => {
            const { container } = render(
                <StatusBadge color={color}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(
                container.querySelector('[aria-hidden="true"]')?.className,
            ).toContain(STATUS_BADGE_STYLES.indicator({ color }))
        })

        it('produces distinct class names for each Badge color', () => {
            const classNames = COLORS.map((color) =>
                STATUS_BADGE_STYLES.indicator({ color }),
            )

            expect(new Set(classNames).size).toBe(COLORS.length)
        })
    })

    describe('position prop', () => {
        it.each(POSITIONS)('renders position="%s"', (position) => {
            const { container } = render(
                <StatusBadge position={position}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(
                container.querySelector('[aria-hidden="true"]')?.className,
            ).toContain(STATUS_BADGE_STYLES.indicator({ position }))
        })

        it('produces distinct class names for each corner', () => {
            const classNames = POSITIONS.map((position) =>
                STATUS_BADGE_STYLES.indicator({ position }),
            )

            expect(new Set(classNames).size).toBe(POSITIONS.length)
        })
    })

    describe('size prop', () => {
        it.each(SIZES)('renders size="%s"', (size) => {
            const { container } = render(
                <StatusBadge size={size}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(
                container.querySelector('[aria-hidden="true"]')?.className,
            ).toContain(STATUS_BADGE_STYLES.indicator({ size }))
        })

        it('produces distinct class names for each size', () => {
            const classNames = SIZES.map((size) =>
                STATUS_BADGE_STYLES.indicator({ size }),
            )

            expect(new Set(classNames).size).toBe(SIZES.length)
        })
    })

    describe('number prop', () => {
        it('renders the number inside the indicator', () => {
            render(
                <StatusBadge number={3}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(screen.getByRole('status', { name: '3' })).toBeTruthy()
            expect(
                screen.getByRole('status').firstElementChild?.className,
            ).toContain(STATUS_BADGE_STYLES.number)
        })

        it('renders zero as a valid number', () => {
            render(
                <StatusBadge number={0}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(screen.getByRole('status', { name: '0' })).toBeTruthy()
        })

        it.each(SIZES)('applies the number sizing for size="%s"', (size) => {
            const { container } = render(
                <StatusBadge number={3} size={size}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(
                container.querySelector('[role="status"]')?.className,
            ).toContain(
                STATUS_BADGE_STYLES.indicator({
                    size,
                    hasNumber: true,
                }),
            )
        })
    })

    describe('accessibility', () => {
        it('exposes a status role when a label is provided', () => {
            render(
                <StatusBadge label={'Unread notifications'}>
                    <span>Inbox</span>
                </StatusBadge>,
            )

            expect(
                screen.getByRole('status', { name: 'Unread notifications' }),
            ).toBeTruthy()
        })

        it('keeps an unlabeled indicator decorative', () => {
            const { container } = render(
                <StatusBadge>
                    <span>Inbox</span>
                </StatusBadge>,
            )

            expect(container.querySelector('[role="status"]')).toBeNull()
            expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
        })
    })

    describe('HTML prop passthrough', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <StatusBadge className={'custom-status-badge'}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(container.firstElementChild?.className).toContain(
                'custom-status-badge',
            )
        })

        it('forwards data attributes', () => {
            render(
                <StatusBadge data-testid={'status-badge'}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(screen.getByTestId('status-badge')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the span wrapper', () => {
            const ref = createRef<HTMLSpanElement>()

            render(
                <StatusBadge ref={ref}>
                    <span>Content</span>
                </StatusBadge>,
            )

            expect(ref.current).toBeTruthy()
            expect(ref.current?.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "StatusBadge"', () => {
            expect(StatusBadge.displayName).toBe('StatusBadge')
        })
    })
})
