import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { createCorrector } from '@hooks/use-viewport-shift/helpers/createCorrector.helper.ts'

describe('createCorrector', () => {
    let content: HTMLElement
    let wrapper: HTMLElement

    beforeEach(() => {
        content = document.createElement('div')
        wrapper = document.createElement('div')
        document.body.appendChild(content)
        document.body.appendChild(wrapper)
    })

    afterEach(() => {
        content.remove()
        wrapper.remove()
    })

    it('does nothing while the wrapper is parked off-screen', () => {
        wrapper.style.transform = 'translate3d(0px, -200%, 0px)'
        const corrector = createCorrector(content, wrapper, { current: { top: 0, right: 0, bottom: 0, left: 0 } })

        corrector()

        expect(content.style.translate).toBe('')
    })

    it('applies no translate when the wrapper already fits in the viewport', () => {
        wrapper.getBoundingClientRect = () =>
            new DOMRect(100, 100, 50, 50)
        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })

        const corrector = createCorrector(content, wrapper, { current: { top: 0, right: 0, bottom: 0, left: 0 } })
        corrector()

        expect(content.style.translate).toBe('')
    })

    it('shifts the content left when the wrapper overflows the right edge', () => {
        wrapper.getBoundingClientRect = () =>
            new DOMRect(900, 100, 200, 50)
        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })

        const corrector = createCorrector(content, wrapper, { current: { top: 0, right: 0, bottom: 0, left: 0 } })
        corrector()

        expect(content.style.translate).toBe('-76px 0px')
    })

    it('shifts the content up when the wrapper overflows the bottom edge', () => {
        wrapper.getBoundingClientRect = () =>
            new DOMRect(100, 700, 50, 100)
        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })

        const corrector = createCorrector(content, wrapper, { current: { top: 0, right: 0, bottom: 0, left: 0 } })
        corrector()

        expect(content.style.translate).toBe('0px -32px')
    })

    it('respects padding when computing overflow', () => {
        wrapper.getBoundingClientRect = () =>
            new DOMRect(950, 100, 100, 50)
        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
        Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })

        const corrector = createCorrector(content, wrapper, { current: { top: 8, right: 16, bottom: 8, left: 16 } })
        corrector()

        expect(content.style.translate).toBe('-42px 0px')
    })
})
