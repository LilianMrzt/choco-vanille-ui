import { createRef, type Ref } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, expectTypeOf, it, vi } from 'vitest'

import { Avatar, type AvatarImageProps } from '@components/data-display/avatar'

/**
 * Captures preload images without changing their native event behavior.
 * @param requests - Mutable list receiving the native image instances.
 * @returns Nothing; the constructor spy is restored after every test.
 * @example
 * captureImageRequests([])
 */
const captureImageRequests = (requests: HTMLImageElement[]): void => {
    const NativeImage = window.Image
    vi.spyOn(window, 'Image').mockImplementation(class extends NativeImage {
        constructor(width?: number, height?: number) {
            super(width, height)
            requests.push(this)
        }
    })
}

afterEach(() => {
    vi.restoreAllMocks()
})

describe('AvatarImage', () => {
    it('retains the native image ref and callback type contracts', () => {
        expectTypeOf<AvatarImageProps['ref']>().toEqualTypeOf<Ref<HTMLImageElement> | undefined>()
        expectTypeOf<NonNullable<AvatarImageProps['onLoadingStatusChange']>>().parameter(0).toEqualTypeOf<'idle' | 'loading' | 'loaded' | 'error'>()
    })

    it('keeps the fallback visible until preload succeeds, then forwards native image props, events and ref', async () => {
        const requests: HTMLImageElement[] = []
        captureImageRequests(requests)
        const ref = createRef<HTMLImageElement>()
        const onLoadingStatusChange = vi.fn()
        const onLoad = vi.fn()
        const onError = vi.fn()
        render(
            <Avatar.Root aria-label="Jane Doe">
                <Avatar.Image
                    ref={ref}
                    src="/jane.png"
                    alt="Jane Doe portrait"
                    data-testid="portrait"
                    className="consumer-image"
                    style={{ objectFit: 'contain' }}
                    onLoad={onLoad}
                    onError={onError}
                    onLoadingStatusChange={onLoadingStatusChange}
                />
                <Avatar.Fallback initials="JD" />
            </Avatar.Root>,
        )
        expect(screen.getByText('JD')).toBeTruthy()
        expect(ref.current).toBeNull()
        expect(screen.queryByRole('img')).toBeNull()
        expect(onLoadingStatusChange.mock.calls).toEqual([['loading']])
        const preloadImage = requests[0]
        expect(preloadImage).toBeDefined()
        await act(async () => {
            fireEvent.load(preloadImage)
        })

        const image = screen.getByRole('img', { name: 'Jane Doe portrait' })
        expect(ref.current).toBe(image)
        expect(image.getAttribute('src')).toBe('/jane.png')
        expect(image.getAttribute('data-testid')).toBe('portrait')
        expect(image.className).toContain('consumer-image')
        expect(ref.current?.style.objectFit).toBe('contain')
        expect(image.hasAttribute('onLoadingStatusChange')).toBe(false)
        expect(screen.queryByText('JD')).toBeNull()
        expect(onLoadingStatusChange.mock.calls).toEqual([['loading'], ['loaded']])

        fireEvent.load(image)
        fireEvent.error(image)
        expect(onLoad).toHaveBeenCalledOnce()
        expect(onLoad.mock.calls[0][0].target).toBe(image)
        expect(onError).toHaveBeenCalledOnce()
        expect(onError.mock.calls[0][0].target).toBe(image)
    })

    it('reports exact error status after a failed preload and keeps the fallback visible', async () => {
        const requests: HTMLImageElement[] = []
        captureImageRequests(requests)
        const onLoadingStatusChange = vi.fn()
        render(
            <Avatar.Root>
                <Avatar.Image src="/broken.png" onLoadingStatusChange={onLoadingStatusChange} />
                <Avatar.Fallback initials="JD" />
            </Avatar.Root>,
        )
        await act(async () => {
            fireEvent.error(requests[0])
        })
        expect(onLoadingStatusChange.mock.calls).toEqual([['loading'], ['error']])
        expect(screen.getByText('JD')).toBeTruthy()
        expect(screen.queryByRole('img')).toBeNull()
    })

    it('defaults a loaded image to an empty decorative alternative', async () => {
        const requests: HTMLImageElement[] = []
        captureImageRequests(requests)
        const { container } = render(<Avatar.Root><Avatar.Image src="/decorative.png" /></Avatar.Root>)
        await act(async () => {
            fireEvent.load(requests[0])
        })
        expect(container.querySelector('img')?.getAttribute('alt')).toBe('')
    })

    it('ignores obsolete preload events after an image URL changes and after unmount', async () => {
        const requests: HTMLImageElement[] = []
        captureImageRequests(requests)
        const onLoadingStatusChange = vi.fn()
        const { rerender, unmount } = render(<Avatar.Root><Avatar.Image src="/first.png" onLoadingStatusChange={onLoadingStatusChange} /></Avatar.Root>)
        rerender(<Avatar.Root><Avatar.Image src="/second.png" onLoadingStatusChange={onLoadingStatusChange} /></Avatar.Root>)
        onLoadingStatusChange.mockClear()
        await act(async () => {
            fireEvent.load(requests[0])
        })
        expect(screen.queryByRole('img')).toBeNull()
        expect(onLoadingStatusChange).not.toHaveBeenCalled()
        unmount()
        await act(async () => {
            fireEvent.load(requests[1])
        })
        expect(onLoadingStatusChange).not.toHaveBeenCalled()
    })

    it('has the namespaced display name', () => {
        expect(Avatar.Image.displayName).toBe('Avatar.Image')
    })
})
