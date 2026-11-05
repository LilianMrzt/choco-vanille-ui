import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Avatar } from '@components/data-display/avatar'
import { AvatarGroup, AVATAR_GROUP_SPACING, type AvatarGroupSpacing } from '@components/data-display/avatar-group'

describe('AvatarGroup', () => {
    it.each([-2, 0])('shows only the full overflow count without a leading offset for max=%s', (max) => {
        const overflowLabel = vi.fn((count: number) => `${count} participants hidden`)
        render(
            <AvatarGroup max={max} overflowLabel={overflowLabel}>
                {Array.from({ length: 12 }, (_, index) => <Avatar key={index} initials="A" />)}
            </AvatarGroup>,
        )
        const overflow = screen.getByRole('img', { name: '12 participants hidden' })
        expect(overflow.textContent).toBe('+12')
        expect(overflow.style.marginLeft).toBe('')
        expect(overflowLabel).toHaveBeenCalledWith(12)
        expect(screen.queryByText('A')).toBeNull()
    })

    it('floors fractional limits before calculating overflow', () => {
        render(<AvatarGroup max={1.9}><Avatar initials="A" /><Avatar initials="B" /><Avatar initials="C" /></AvatarGroup>)
        expect(screen.getByText('A')).toBeTruthy()
        expect(screen.queryByText('B')).toBeNull()
        expect(screen.getByRole('img', { name: '2 more' }).textContent).toBe('+2')
    })

    it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])('throws RangeError for non-finite max=%s', (max) => {
        expect(() => render(<AvatarGroup max={max}><Avatar initials="A" /><Avatar initials="B" /></AvatarGroup>))
            .toThrow(new RangeError('AvatarGroup max must be a finite number when provided.'))
    })

    it('shows all children for an explicitly undefined max', () => {
        render(<AvatarGroup max={undefined}><Avatar initials="A" /><Avatar initials="B" /></AvatarGroup>)
        expect(screen.getByText('A')).toBeTruthy()
        expect(screen.getByText('B')).toBeTruthy()
        expect(screen.queryByRole('img')).toBeNull()
    })

    it('preserves avatar styles while group overlap overrides only the leading margin', () => {
        render(
            <AvatarGroup spacing="lg">
                <Avatar initials="A" data-testid="first" style={{ marginLeft: '4px', opacity: 0.5 }} />
                <Avatar initials="B" data-testid="second" style={{ marginLeft: '4px', opacity: 0.7 }} />
                <span data-testid="custom">Custom child</span>
            </AvatarGroup>,
        )
        expect(screen.getByTestId('first').style.marginLeft).toBe('4px')
        expect(screen.getByTestId('second').style.marginLeft).toBe('-1rem')
        expect(screen.getByTestId('second').style.opacity).toBe('0.7')
        expect(screen.getByTestId('custom').parentElement?.style.marginLeft).toBe('-1rem')
    })

    it('forwards native events, ARIA and refs to the selected element without custom prop leakage', () => {
        const ref = createRef<HTMLSpanElement>()
        const onClick = vi.fn()
        render(
            <AvatarGroup as="span" ref={ref} role="group" aria-label="Participants" onClick={onClick} max={1} spacing="sm">
                <Avatar initials="A" />
            </AvatarGroup>,
        )
        const group = screen.getByRole('group', { name: 'Participants' })
        expect(ref.current).toBe(group)
        expect(group.tagName).toBe('SPAN')
        expect(group.hasAttribute('max')).toBe(false)
        expect(group.hasAttribute('spacing')).toBe(false)
        fireEvent.click(group)
        expect(onClick).toHaveBeenCalledOnce()
        expect(onClick.mock.calls[0][0].target).toBe(group)
    })

    describe('default rendering', () => {
        it('renders all Avatar children when max is not set', () => {
            render(
                <AvatarGroup>
                    <Avatar initials="A" />
                    <Avatar initials="B" />
                    <Avatar initials="C" />
                </AvatarGroup>,
            )
            expect(screen.getByText('A')).toBeTruthy()
            expect(screen.getByText('B')).toBeTruthy()
            expect(screen.getByText('C')).toBeTruthy()
        })

        it('renders a flex wrapper element', () => {
            const { container } = render(
                <AvatarGroup>
                    <Avatar initials="A" />
                </AvatarGroup>,
            )
            expect(container.firstElementChild).toBeTruthy()
        })
    })

    describe('max prop', () => {
        it('hides avatars beyond the max count', () => {
            render(
                <AvatarGroup max={2}>
                    <Avatar initials="A" />
                    <Avatar initials="B" />
                    <Avatar initials="C" />
                    <Avatar initials="D" />
                </AvatarGroup>,
            )
            expect(screen.getByText('A')).toBeTruthy()
            expect(screen.getByText('B')).toBeTruthy()
            expect(screen.queryByText('C')).toBeFalsy()
            expect(screen.queryByText('D')).toBeFalsy()
        })

        it('renders a +N overflow indicator', () => {
            render(
                <AvatarGroup max={2}>
                    <Avatar initials="A" />
                    <Avatar initials="B" />
                    <Avatar initials="C" />
                    <Avatar initials="D" />
                </AvatarGroup>,
            )
            expect(screen.getByText('+2')).toBeTruthy()
        })

        it('does not render an overflow indicator when all avatars are visible', () => {
            render(
                <AvatarGroup max={3}>
                    <Avatar initials="A" />
                    <Avatar initials="B" />
                    <Avatar initials="C" />
                </AvatarGroup>,
            )
            expect(screen.queryByText(/^\+/)).toBeFalsy()
        })
    })

    describe('overflow accessible label', () => {
        it('provides a default accessible label for the overflow indicator', () => {
            render(
                <AvatarGroup max={1}>
                    <Avatar initials="A" />
                    <Avatar initials="B" />
                    <Avatar initials="C" />
                </AvatarGroup>,
            )
            expect(screen.getByLabelText('2 more')).toBeTruthy()
        })

        it('accepts a custom overflowLabel function for i18n', () => {
            render(
                <AvatarGroup max={1} overflowLabel={(count) => `${count} de plus`}>
                    <Avatar initials="A" />
                    <Avatar initials="B" />
                    <Avatar initials="C" />
                </AvatarGroup>,
            )
            expect(screen.getByLabelText('2 de plus')).toBeTruthy()
        })
    })

    describe('spacing prop', () => {
        it('exports the AVATAR_GROUP_SPACING constant with all spacing keys', () => {
            const keys: AvatarGroupSpacing[] = ['none', 'sm', 'md', 'lg', 'xl']
            for (const key of keys) {
                expect(AVATAR_GROUP_SPACING[key]).toBeDefined()
            }
        })

        it('renders without crashing for each spacing value', () => {
            for (const spacing of [
                'none',
                'sm',
                'md',
                'lg',
                'xl',
            ] as AvatarGroupSpacing[]) {
                const { unmount } = render(
                    <AvatarGroup spacing={spacing}>
                        <Avatar initials="A" />
                        <Avatar initials="B" />
                    </AvatarGroup>,
                )
                expect(screen.getAllByText('A').length).toBeGreaterThanOrEqual(1)
                unmount()
            }
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <AvatarGroup className="my-group">
                    <Avatar initials="A" />
                </AvatarGroup>,
            )
            expect((container.firstElementChild as HTMLElement).className).toContain(
                'my-group',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <AvatarGroup ref={ref}>
                    <Avatar initials="A" />
                </AvatarGroup>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <AvatarGroup data-testid="avatar-group">
                    <Avatar initials="A" />
                </AvatarGroup>,
            )
            expect(
                container.querySelector('[data-testid="avatar-group"]'),
            ).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "AvatarGroup"', () => {
            expect(AvatarGroup.displayName).toBe('AvatarGroup')
        })
    })
})
