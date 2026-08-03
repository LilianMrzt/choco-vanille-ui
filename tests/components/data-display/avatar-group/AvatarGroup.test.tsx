import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { Avatar } from '@components/data-display/avatar'
import AvatarGroup from '@components/data-display/avatar-group/AvatarGroup.tsx'
import { AVATAR_GROUP_SPACING } from '@components/data-display/avatar-group/constants'
import type { AvatarGroupSpacing } from '@components/data-display/avatar-group/types/AvatarGroup.props.ts'

beforeAll(() => {
    addIcon('lucide:user', {
        body: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        width: 24,
        height: 24,
    })
})

describe('AvatarGroup', () => {
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
            for (const spacing of ['none', 'sm', 'md', 'lg', 'xl'] as AvatarGroupSpacing[]) {
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
            expect((container.firstElementChild as HTMLElement).className).toContain('my-group')
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
            expect(container.querySelector('[data-testid="avatar-group"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "AvatarGroup"', () => {
            expect(AvatarGroup.displayName).toBe('AvatarGroup')
        })
    })
})
