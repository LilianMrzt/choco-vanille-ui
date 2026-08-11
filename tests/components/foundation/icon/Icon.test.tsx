import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Icon } from '@components/foundation/icon'
import UserIcon from '@resources/asset/UserIcon.svg?react'

// The tests below only cover logic that belongs to the Icon wrapper itself:
// - ARIA attributes (decorative vs. semantic icon pattern)
// - displayName

describe('Icon', () => {
    describe('accessibility — decorative icon (no label)', () => {
        it('sets aria-hidden="true"', () => {
            const { container } = render(<Icon icon={UserIcon} />)
            expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
                'true',
            )
        })
    })

    describe('accessibility — semantic icon (with label)', () => {
        it('removes aria-hidden', () => {
            const { container } = render(
                <Icon icon={UserIcon} aria-label={'Home'} />,
            )
            const svg = container.querySelector('svg')
            // aria-hidden must be absent or "false" — never "true"
            expect(svg?.getAttribute('aria-hidden')).not.toBe('true')
        })

        it('sets role="img" and aria-label', () => {
            render(<Icon icon={UserIcon} aria-label={'Home'} />)
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
