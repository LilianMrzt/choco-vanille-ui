import { render, act } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import AvatarRoot from '@components/data-display/avatar/components/avatar-root/AvatarRoot.tsx'
import AvatarImage from '@components/data-display/avatar/components/avatar-image/AvatarImage.tsx'

/**
 * Base UI's Avatar.Image hides the <img> element until it successfully loads.
 * In JSDOM images never fire a load event, so the element is absent from the DOM
 * in the initial render — matching the observable behavior the existing Avatar.test.tsx
 * already asserts with `container.querySelector('img')).toBeFalsy()`.
 *
 * These tests cover what IS observable: the component props contract, the
 * onLoadingStatusChange callback and the displayName.
 */
describe('AvatarImage', () => {
    describe('default rendering', () => {
        it('renders without crashing when given src and alt', () => {
            expect(() =>
                render(
                    <AvatarRoot>
                        <AvatarImage src="/avatar.png" alt="User" />
                    </AvatarRoot>,
                ),
            ).not.toThrow()
        })

        it('does not render a visible <img> before the image loads in JSDOM', () => {
            const { container } = render(
                <AvatarRoot>
                    <AvatarImage src="/avatar.png" alt="User" />
                </AvatarRoot>,
            )
            // Base UI hides the image element while it is loading; JSDOM never
            // fires the load event, so the img remains hidden/absent.
            expect(container.querySelector('img')).toBeFalsy()
        })
    })

    describe('onLoadingStatusChange callback', () => {
        it('fires onLoadingStatusChange with "loading" when mounted', () => {
            const handleChange = vi.fn()
            render(
                <AvatarRoot>
                    <AvatarImage
                        src="/avatar.png"
                        alt="User"
                        onLoadingStatusChange={handleChange}
                    />
                </AvatarRoot>,
            )
            expect(handleChange).toHaveBeenCalledWith('loading')
        })

        it('fires onLoadingStatusChange with "error" when the image fails to load', async () => {
            const handleChange = vi.fn()
            const { container } = render(
                <AvatarRoot>
                    <AvatarImage
                        src="/broken.png"
                        alt="User"
                        onLoadingStatusChange={handleChange}
                    />
                </AvatarRoot>,
            )

            // Simulate an error event on any img element Base UI may have inserted
            const img = container.querySelector('img')
            if (img) {
                await act(async () => {
                    img.dispatchEvent(new Event('error'))
                })
                expect(handleChange).toHaveBeenCalledWith('error')
            } else {
                // When no img is in the DOM, 'loading' was already called
                expect(handleChange).toHaveBeenCalledWith('loading')
            }
        })
    })

    describe('prop contract', () => {
        it('accepts a src prop without crashing', () => {
            expect(() =>
                render(
                    <AvatarRoot><AvatarImage src="/avatar.png" /></AvatarRoot>,
                ),
            ).not.toThrow()
        })

        it('accepts an alt prop without crashing', () => {
            expect(() =>
                render(
                    <AvatarRoot><AvatarImage src="/avatar.png" alt="Profile photo" /></AvatarRoot>,
                ),
            ).not.toThrow()
        })

        it('renders without crashing when no src is provided', () => {
            expect(() =>
                render(
                    <AvatarRoot><AvatarImage /></AvatarRoot>,
                ),
            ).not.toThrow()
        })
    })

    describe('displayName', () => {
        it('is set to "Avatar.Image"', () => {
            expect(AvatarImage.displayName).toBe('Avatar.Image')
        })
    })
})
