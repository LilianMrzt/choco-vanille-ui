import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { watchRepositions } from '@hooks/use-viewport-shift/helpers/watchRepositions.helper.ts'

describe('watchRepositions', () => {
    let content: HTMLElement
    let wrapper: HTMLElement
    let correct: ReturnType<typeof vi.fn>
    let cleanup: () => void
    let mutationCallback: (() => void) | null = null
    let resizeCallback: (() => void) | null = null

    beforeEach(() => {
        content = document.createElement('div')
        wrapper = document.createElement('div')
        document.body.appendChild(content)
        document.body.appendChild(wrapper)
        correct = vi.fn()

        class MockMutationObserver {
            constructor(private callback: () => void) {
                mutationCallback = callback
            }

            observe(_target: Node, options?: MutationObserverInit) {
                expect(options?.attributeFilter).toContain('style')
            }

            disconnect() {
                mutationCallback = null
            }
        }

        class MockResizeObserver {
            constructor(private callback: () => void) {
                resizeCallback = callback
            }

            observe(_target: Element) {}

            disconnect() {
                resizeCallback = null
            }
        }

        vi.stubGlobal('MutationObserver', MockMutationObserver)
        vi.stubGlobal('ResizeObserver', MockResizeObserver)

        cleanup = watchRepositions(content, wrapper, correct)
    })

    afterEach(() => {
        cleanup()
        content.remove()
        wrapper.remove()
        vi.unstubAllGlobals()
    })

    it('observes wrapper style mutations and calls correct', () => {
        expect(mutationCallback).toBeTypeOf('function')
        mutationCallback?.()
        expect(correct).toHaveBeenCalled()
    })

    it('observes content resize and calls correct', () => {
        expect(resizeCallback).toBeTypeOf('function')
        resizeCallback?.()
        expect(correct).toHaveBeenCalled()
    })

    it('calls correct on window resize', () => {
        window.dispatchEvent(new Event('resize'))
        expect(correct).toHaveBeenCalled()
    })

    it('stops observing after cleanup', () => {
        cleanup()

        expect(mutationCallback).toBeNull()
        expect(resizeCallback).toBeNull()

        correct.mockClear()
        window.dispatchEvent(new Event('resize'))
        expect(correct).not.toHaveBeenCalled()
    })
})
