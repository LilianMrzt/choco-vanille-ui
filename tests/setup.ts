// Setup file for unit tests — extend Vitest matchers here if needed.
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Radix UI primitives rely on ResizeObserver (not implemented in jsdom).
global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

if (typeof window !== 'undefined') {
    // Radix UI Tooltip relies on PointerEvent (not implemented in jsdom).
    class MockPointerEvent extends MouseEvent {
        readonly pointerId: number
        constructor(type: string, params: PointerEventInit = {}) {
            super(type, params)
            this.pointerId = params.pointerId ?? 1
        }
    }
    Object.defineProperty(window, 'PointerEvent', {
        value: MockPointerEvent,
        writable: true,
    })
    // Ensure pointer-event methods exist on HTMLElement for Radix primitives.
    window.HTMLElement.prototype.hasPointerCapture = () => false
    window.HTMLElement.prototype.releasePointerCapture = () => {}
    window.HTMLElement.prototype.setPointerCapture = () => {}
}

// Unmount React trees and reset the jsdom document between tests so queries
// like `screen.getByRole('button')` stay scoped to the current render.
afterEach(() => {
    cleanup()
})
