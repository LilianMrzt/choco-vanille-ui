import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import { useViewportShift } from '@hooks/use-viewport-shift/useViewportShift.hook.ts'

describe('useViewportShift', () => {
    const originalMutationObserver = global.MutationObserver
    const originalResizeObserver = global.ResizeObserver
    const originalInnerWidth = Object.getOwnPropertyDescriptor(window, 'innerWidth')
    const originalInnerHeight = Object.getOwnPropertyDescriptor(window, 'innerHeight')

    const createMockObserver = (name: string) =>
        // eslint-disable-next-line prefer-arrow-callback
        vi.fn(function MockObserver(this: object, callback: () => void) {
            return {
                observe: vi.fn(),
                unobserve: vi.fn(),
                disconnect: vi.fn(),
                trigger: callback,
                name,
            }
        })

    afterEach(() => {
        vi.restoreAllMocks()
        global.MutationObserver = originalMutationObserver
        global.ResizeObserver = originalResizeObserver
        if (originalInnerWidth) {
            Object.defineProperty(window, 'innerWidth', originalInnerWidth)
        }
        if (originalInnerHeight) {
            Object.defineProperty(window, 'innerHeight', originalInnerHeight)
        }
    })

    it('returns a stable callback ref function', () => {
        const { result, rerender } = renderHook(() => useViewportShift())
        const firstRef = result.current
        rerender()
        expect(result.current).toBe(firstRef)
    })

    it('does nothing when the callback ref receives null', () => {
        const MutationObserverMock = createMockObserver('mutation')
        const ResizeObserverMock = createMockObserver('resize')
        global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver
        global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

        const { result } = renderHook(() => useViewportShift())
        const cleanup = result.current(null)

        expect(cleanup).toBeUndefined()
        expect(MutationObserverMock).not.toHaveBeenCalled()
        expect(ResizeObserverMock).not.toHaveBeenCalled()
    })

    it('observes wrapper style mutations and content resize, and listens to window resize', () => {
        const MutationObserverMock = createMockObserver('mutation')
        const ResizeObserverMock = createMockObserver('resize')
        global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver
        global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
        const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

        const content = document.createElement('div')
        const wrapper = document.createElement('div')
        document.body.appendChild(wrapper)
        wrapper.appendChild(content)

        const { result } = renderHook(() => useViewportShift())
        result.current(content)

        expect(MutationObserverMock).toHaveBeenCalledTimes(1)
        expect(ResizeObserverMock).toHaveBeenCalledTimes(1)
        expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

        document.body.removeChild(wrapper)
    })

    it('applies a translate correction when the wrapper overflows the viewport', () => {
        const MutationObserverMock = createMockObserver('mutation')
        const ResizeObserverMock = createMockObserver('resize')
        global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver
        global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

        Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true, configurable: true })
        Object.defineProperty(window, 'innerHeight', { value: 800, writable: true, configurable: true })

        const content = document.createElement('div')
        const wrapper = document.createElement('div')
        wrapper.getBoundingClientRect = () =>
            new DOMRect(900, 750, 200, 100)
        document.body.appendChild(wrapper)
        wrapper.appendChild(content)

        const { result } = renderHook(() => useViewportShift(8))
        result.current(content)

        const mutationInstance = MutationObserverMock.mock.results[0].value
        mutationInstance.trigger()

        expect(content.style.translate).toBe('-108px -58px')

        document.body.removeChild(wrapper)
    })

    it('skips correction while Radix positions the wrapper off-screen', () => {
        const MutationObserverMock = createMockObserver('mutation')
        const ResizeObserverMock = createMockObserver('resize')
        global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver
        global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

        const content = document.createElement('div')
        const wrapper = document.createElement('div')
        wrapper.style.transform = 'translate3d(-200%, 0, 0)'
        wrapper.getBoundingClientRect = () => new DOMRect(900, 750, 200, 100)
        document.body.appendChild(wrapper)
        wrapper.appendChild(content)

        const { result } = renderHook(() => useViewportShift())
        result.current(content)

        const mutationInstance = MutationObserverMock.mock.results[0].value
        mutationInstance.trigger()

        expect(content.style.translate).toBe('')

        document.body.removeChild(wrapper)
    })

    it('returns a cleanup that disconnects observers and removes listeners', () => {
        const MutationObserverMock = createMockObserver('mutation')
        const ResizeObserverMock = createMockObserver('resize')
        global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver
        global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

        const content = document.createElement('div')
        const wrapper = document.createElement('div')
        document.body.appendChild(wrapper)
        wrapper.appendChild(content)

        const { result } = renderHook(() => useViewportShift())
        const cleanup = result.current(content)
        cleanup?.()

        const mutationInstance = MutationObserverMock.mock.results[0].value
        const resizeInstance = ResizeObserverMock.mock.results[0].value

        expect(mutationInstance.disconnect).toHaveBeenCalled()
        expect(resizeInstance.disconnect).toHaveBeenCalled()
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

        document.body.removeChild(wrapper)
    })

    it('guards against accidental selection by stopping pointerup without pointerdown', () => {
        const MutationObserverMock = createMockObserver('mutation')
        const ResizeObserverMock = createMockObserver('resize')
        global.MutationObserver = MutationObserverMock as unknown as typeof MutationObserver
        global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver

        const content = document.createElement('div')
        const wrapper = document.createElement('div')
        document.body.appendChild(wrapper)
        wrapper.appendChild(content)

        const { result } = renderHook(() => useViewportShift())
        result.current(content)

        const pointerUpEvent = new PointerEvent('pointerup', { bubbles: true })
        const stopImmediatePropagationSpy = vi.spyOn(pointerUpEvent, 'stopImmediatePropagation')
        content.dispatchEvent(pointerUpEvent)

        expect(stopImmediatePropagationSpy).toHaveBeenCalled()

        document.body.removeChild(wrapper)
    })
})
