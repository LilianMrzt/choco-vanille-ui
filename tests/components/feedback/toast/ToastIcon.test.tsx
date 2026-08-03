import { render } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { Toast, type ToastVariant } from '@components/feedback/toast'

// Preload every default variant icon so Iconify renders synchronously in JSDOM.
beforeAll(() => {
    addIcon('lucide:info', {
        body: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:circle-check', {
        body: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:triangle-alert', {
        body: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:circle-x', {
        body: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:check', {
        body: '<path d="M21 7L9 19l-5.5-5.5 1.41-1.41L9 16.17 19.59 5.59 21 7z"/>',
        width: 24,
        height: 24,
    })
})

// Suites

describe('ToastIcon', () => {
    describe('default rendering', () => {
        it('renders an SVG icon using the default info variant', () => {
            const { container } = render(<Toast.Icon />)
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an SVG when a custom icon is supplied', () => {
            const { container } = render(
                <Toast.Icon icon={'lucide:check'} />,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('variant context', () => {
        const variants: ToastVariant[] = ['info', 'success', 'warning', 'error']

        it.each(variants)(
            'renders an SVG for the "%s" variant via the Toast root',
            (variant) => {
                const { container } = render(
                    <Toast variant={variant}>
                        <Toast.Icon />
                    </Toast>,
                )
                expect(container.querySelector('svg')).toBeTruthy()
            },
        )
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the SVG element', () => {
            const { container } = render(
                <Toast.Icon className={'my-icon'} />,
            )
            // Icon renders Box > Iconify SVG; className is applied to the SVG.
            // SVGElement.className is SVGAnimatedString — use getAttribute.
            expect(
                container.querySelector('svg')!.getAttribute('class'),
            ).toContain('my-icon')
        })
    })

    describe('displayName', () => {
        it('is set to "Toast.Icon"', () => {
            expect(Toast.Icon.displayName).toBe('Toast.Icon')
        })
    })
})
