import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toast, type ToastVariant } from '@components/feedback/toast'
import CheckIcon from '@resources/asset/CheckIcon.svg?react'

// Suites

describe('ToastIcon', () => {
    describe('default rendering', () => {
        it('renders an SVG icon using the default info variant', () => {
            const { container } = render(<Toast.Icon />)
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an SVG when a custom icon is supplied', () => {
            const { container } = render(<Toast.Icon icon={CheckIcon} />)
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
            const { container } = render(<Toast.Icon className={'my-icon'} />)
            // className is applied to the SVG.
            // SVGElement.className is SVGAnimatedString — use getAttribute.
            expect(container.querySelector('svg')!.getAttribute('class')).toContain(
                'my-icon',
            )
        })
    })

    describe('displayName', () => {
        it('is set to "Toast.Icon"', () => {
            expect(Toast.Icon.displayName).toBe('Toast.Icon')
        })
    })
})
