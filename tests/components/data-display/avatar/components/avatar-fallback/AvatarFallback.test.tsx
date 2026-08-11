import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import AvatarFallback from '@components/data-display/avatar/components/avatar-fallback/AvatarFallback.tsx'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'

describe('AvatarFallback', () => {
    describe('initials', () => {
        it('renders initials text', () => {
            render(
                <AvatarRoot>
                    <AvatarFallback initials="JD" />
                </AvatarRoot>,
            )
            expect(screen.getByText('JD')).toBeTruthy()
        })

        it('truncates initials to at most two characters', () => {
            render(
                <AvatarRoot>
                    <AvatarFallback initials="John" />
                </AvatarRoot>,
            )
            expect(screen.getByText('JO')).toBeTruthy()
        })

        it('uppercases the initials', () => {
            render(
                <AvatarRoot>
                    <AvatarFallback initials="ab" />
                </AvatarRoot>,
            )
            expect(screen.getByText('AB')).toBeTruthy()
        })
    })

    describe('icon fallback', () => {
        it('renders an SVG icon when the icon prop is provided', () => {
            const { container } = render(
                <AvatarRoot>
                    <AvatarFallback icon={CircleIcon} />
                </AvatarRoot>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders the default user icon when neither initials nor icon are provided', () => {
            const { container } = render(
                <AvatarRoot>
                    <AvatarFallback />
                </AvatarRoot>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('size prop', () => {
        it('renders without crashing for each valid size', () => {
            for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
                const { unmount } = render(
                    <AvatarRoot>
                        <AvatarFallback initials="A" size={size} />
                    </AvatarRoot>,
                )
                expect(screen.getByText('A')).toBeTruthy()
                unmount()
            }
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <AvatarRoot>
                    <AvatarFallback initials="A" className="my-fallback" />
                </AvatarRoot>,
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
