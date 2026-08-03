import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import AvatarFallback from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.tsx'

beforeAll(() => {
    addIcon('lucide:user', {
        body: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:star', {
        body: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        width: 24,
        height: 24,
    })
})

describe('AvatarFallback', () => {
    describe('initials', () => {
        it('renders initials text', () => {
            render(<AvatarRoot><AvatarFallback initials="JD" /></AvatarRoot>)
            expect(screen.getByText('JD')).toBeTruthy()
        })

        it('truncates initials to at most two characters', () => {
            render(<AvatarRoot><AvatarFallback initials="John" /></AvatarRoot>)
            expect(screen.getByText('JO')).toBeTruthy()
        })

        it('uppercases the initials', () => {
            render(<AvatarRoot><AvatarFallback initials="ab" /></AvatarRoot>)
            expect(screen.getByText('AB')).toBeTruthy()
        })
    })

    describe('icon fallback', () => {
        it('renders an SVG icon when the icon prop is provided', () => {
            const { container } = render(
                <AvatarRoot><AvatarFallback icon="lucide:star" /></AvatarRoot>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders the default user icon when neither initials nor icon are provided', () => {
            const { container } = render(
                <AvatarRoot><AvatarFallback /></AvatarRoot>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('size prop', () => {
        it('renders without crashing for each valid size', () => {
            for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
                const { unmount } = render(
                    <AvatarRoot><AvatarFallback initials="A" size={size} /></AvatarRoot>,
                )
                expect(screen.getByText('A')).toBeTruthy()
                unmount()
            }
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <AvatarRoot><AvatarFallback initials="A" className="my-fallback" /></AvatarRoot>,
            )
            expect(container.querySelector('.my-fallback')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Avatar.Fallback"', () => {
            expect(AvatarFallback.displayName).toBe('Avatar.Fallback')
        })
    })
})
