import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { Icon } from '@components/foundation/icon'

// Preload a test icon so Iconify renders synchronously in JSDOM
beforeAll(() => {
    addIcon('mdi:home', {
        body: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
        width: 24,
        height: 24,
    })
})

// The tests below only cover logic that belongs to the Icon wrapper itself:
// - ARIA attributes (decorative vs. semantic icon pattern)
// - displayName
//
// We deliberately do not test SVG rendering, className forwarding or prop
// pass-through because those are responsibilities of @iconify/react, not ours.

describe('Icon', () => {
    describe('accessibility — decorative icon (no label)', () => {
        it('sets aria-hidden="true"', () => {
            const { container } = render(<Icon icon={'mdi:home'} />)
            expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
        })
    })

    describe('accessibility — semantic icon (with label)', () => {
        it('removes aria-hidden', () => {
            const { container } = render(<Icon icon={'mdi:home'} aria-label={'Home'} />)
            const svg = container.querySelector('svg')
            // aria-hidden must be absent or "false" — never "true"
            expect(svg?.getAttribute('aria-hidden')).not.toBe('true')
        })

        it('sets role="img" and aria-label', () => {
            render(<Icon icon={'mdi:home'} aria-label={'Home'} />)
            // getByRole throws if not found, so finding the element is the assertion
            expect(screen.getByRole('img', { name: 'Home' })).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Icon"', () => {
            expect(Icon.displayName).toBe('Icon')
        })
    })
})
