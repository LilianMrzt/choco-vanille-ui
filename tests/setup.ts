// Setup file for unit tests — extend Vitest matchers here if needed.
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Unmount React trees and reset the jsdom document between tests so queries
// like `screen.getByRole('button')` stay scoped to the current render.
afterEach(() => {
    cleanup()
})
