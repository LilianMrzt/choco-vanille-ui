import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Legend } from '@components/forms/primitives/legend'

describe('Legend', () => {
    describe('default rendering', () => {
        it('renders a <legend> element', () => {
            render(
                <fieldset>
                    <Legend>Choose a plan</Legend>
                </fieldset>,
            )
            expect(document.querySelector('legend')).toBeTruthy()
        })

        it('renders children as text content', () => {
            render(
                <fieldset>
                    <Legend>Notification preferences</Legend>
                </fieldset>,
            )
            expect(screen.getByText('Notification preferences')).toBeTruthy()
        })

        it('renders with a non-empty className by default', () => {
            render(
                <fieldset>
                    <Legend>Label</Legend>
                </fieldset>,
            )
            expect(document.querySelector('legend')!.className.length).toBeGreaterThan(0)
        })
    })

    describe('className prop', () => {
        it('merges a custom className with the base styles', () => {
            render(
                <fieldset>
                    <Legend className={'my-legend'}>Label</Legend>
                </fieldset>,
            )
            expect(document.querySelector('legend')!.className).toContain('my-legend')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <fieldset>
                    <Legend data-testid={'my-legend'}>Label</Legend>
                </fieldset>,
            )
            expect(screen.getByTestId('my-legend').tagName.toLowerCase()).toBe('legend')
        })

        it('forwards id attribute', () => {
            render(
                <fieldset>
                    <Legend id={'legend-id'}>Label</Legend>
                </fieldset>,
            )
            expect(document.querySelector('legend')!.getAttribute('id')).toBe('legend-id')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the <legend> element', () => {
            const ref = createRef<HTMLLegendElement>()
            render(
                <fieldset>
                    <Legend ref={ref}>Label</Legend>
                </fieldset>,
            )
            expect(ref.current).not.toBeNull()
            expect(ref.current!.tagName.toLowerCase()).toBe('legend')
        })
    })

    describe('displayName', () => {
        it('is set to "Legend"', () => {
            expect(Legend.displayName).toBe('Legend')
        })
    })
})
