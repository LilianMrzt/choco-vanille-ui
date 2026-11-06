import { createRef, type RefCallback } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useComposedPopupRef } from '@components/overlay/_shared/hooks/use-composed-popup-ref/useComposedPopupRef.hook'

describe('useComposedPopupRef', () => {
    it('sets the object ref and runs internal cleanup on unmount', () => {
        const cleanup = vi.fn()
        const internal = vi.fn<RefCallback<HTMLDivElement>>(() => cleanup)
        const external = createRef<HTMLDivElement>()
        const Example = () => <div ref={useComposedPopupRef(internal, external)} />
        const { container, unmount } = render(<Example />)

        expect(external.current).toBe(container.firstChild)
        unmount()
        expect(cleanup).toHaveBeenCalledOnce()
        expect(external.current).toBeNull()
    })

    it('runs both callback cleanup functions', () => {
        const internalCleanup = vi.fn()
        const externalCleanup = vi.fn()
        const internal = vi.fn<RefCallback<HTMLDivElement>>(() => internalCleanup)
        const external = vi.fn<RefCallback<HTMLDivElement>>(() => externalCleanup)
        const Example = () => <div ref={useComposedPopupRef(internal, external)} />
        const { unmount } = render(<Example />)

        unmount()
        expect(internalCleanup).toHaveBeenCalledOnce()
        expect(externalCleanup).toHaveBeenCalledOnce()
        expect(external).toHaveBeenCalledOnce()
    })
})
