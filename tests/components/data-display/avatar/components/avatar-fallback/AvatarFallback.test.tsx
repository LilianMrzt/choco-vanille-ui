import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Avatar, type AvatarFallbackProps } from '@components/data-display/avatar'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'

const { Root: AvatarRoot, Fallback: AvatarFallback } = Avatar

describe('AvatarFallback', () => {
    it('forwards the fallback span ref, native events and attributes while filtering content props', () => {
        const ref = createRef<HTMLSpanElement>()
        const onClick = vi.fn()
        const props: AvatarFallbackProps = { ref, onClick, initials: 'jd', size: 'lg', className: 'consumer', style: { opacity: 0.5 } }
        render(<Avatar.Root aria-label="Jane Doe"><Avatar.Fallback {...props} data-testid="fallback" /></Avatar.Root>)
        const fallback = screen.getByTestId('fallback')
        expect(ref.current).toBe(fallback)
        expect(fallback.tagName).toBe('SPAN')
        expect(fallback.className).toContain('consumer')
        expect(fallback.style.opacity).toBe('0.5')
        expect(fallback.style.width).toBe('100%')
        expect(fallback.style.height).toBe('100%')
        expect(fallback.style.alignItems).toBe('center')
        expect(fallback.style.justifyContent).toBe('center')
        expect(fallback.hasAttribute('initials')).toBe(false)
        expect(fallback.hasAttribute('size')).toBe(false)
        expect(screen.getByText('JD').getAttribute('aria-hidden')).toBe('true')
        fireEvent.click(fallback)
        expect(onClick.mock.calls[0][0].target).toBe(fallback)
    })

    it('supports custom content without truncating it', () => {
        render(<Avatar.Root><Avatar.Fallback initials="JD">+123</Avatar.Fallback></Avatar.Root>)
        expect(screen.getByText('+123')).toBeTruthy()
        expect(screen.queryByText('JD')).toBeNull()
    })

    it('treats empty initials as an icon fallback', () => {
        const { container } = render(<Avatar.Root><Avatar.Fallback initials="" /></Avatar.Root>)
        expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
    })

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
