import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { guardAccidentalSelection } from '@hooks/use-viewport-shift/helpers/guardAccidentalSelection.helper.ts'

describe('guardAccidentalSelection', () => {
    let content: HTMLElement
    let cleanup: () => void

    beforeEach(() => {
        content = document.createElement('div')
        document.body.appendChild(content)
        cleanup = guardAccidentalSelection(content)
    })

    afterEach(() => {
        cleanup()
        content.remove()
    })

    it('stops pointerup propagation when no pointerdown occurred inside', () => {
        const pointerUp = new PointerEvent('pointerup', { bubbles: true })
        const stopImmediatePropagation = vi.spyOn(pointerUp, 'stopImmediatePropagation')

        content.dispatchEvent(pointerUp)

        expect(stopImmediatePropagation).toHaveBeenCalled()
    })

    it('allows pointerup propagation after a pointerdown inside the content', () => {
        const pointerDown = new PointerEvent('pointerdown', { bubbles: true })
        const pointerUp = new PointerEvent('pointerup', { bubbles: true })
        const stopImmediatePropagation = vi.spyOn(pointerUp, 'stopImmediatePropagation')

        content.dispatchEvent(pointerDown)
        content.dispatchEvent(pointerUp)

        expect(stopImmediatePropagation).not.toHaveBeenCalled()
    })

    it('resets the guard after each pointerup', () => {
        const pointerDown = new PointerEvent('pointerdown', { bubbles: true })
        const firstPointerUp = new PointerEvent('pointerup', { bubbles: true })
        const secondPointerUp = new PointerEvent('pointerup', { bubbles: true })

        content.dispatchEvent(pointerDown)
        content.dispatchEvent(firstPointerUp)

        const stopImmediatePropagation = vi.spyOn(secondPointerUp, 'stopImmediatePropagation')
        content.dispatchEvent(secondPointerUp)

        expect(stopImmediatePropagation).toHaveBeenCalled()
    })
})
