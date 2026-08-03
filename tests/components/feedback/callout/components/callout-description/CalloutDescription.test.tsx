import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Callout } from '@components/feedback/callout'
import CalloutDescription from '@components/feedback/callout/components/callout-description/CalloutDescription.tsx'

describe('CalloutDescription', () => {
    describe('default rendering', () => {
        it('renders its text children', () => {
            render(
                <Callout>
                    <CalloutDescription>This is the description.</CalloutDescription>
                </Callout>,
            )
            expect(screen.getByText('This is the description.')).toBeTruthy()
        })

        it('renders complex children', () => {
            render(
                <Callout>
                    <CalloutDescription>
                        <span data-testid="inner">Inner</span>
                    </CalloutDescription>
                </Callout>,
            )
            expect(screen.getByTestId('inner')).toBeTruthy()
        })

        it('renders a <span> element', () => {
            render(
                <Callout>
                    <CalloutDescription>Description</CalloutDescription>
                </Callout>,
            )
            const desc = screen.getByText('Description')
            expect(desc.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Callout>
                    <CalloutDescription className="my-desc">Description</CalloutDescription>
                </Callout>,
            )
            expect(container.querySelector('.my-desc')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Callout>
                    <CalloutDescription data-testid="callout-desc">Description</CalloutDescription>
                </Callout>,
            )
            expect(container.querySelector('[data-testid="callout-desc"]')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLSpanElement>()
            render(
                <Callout>
                    <CalloutDescription ref={ref}>Description</CalloutDescription>
                </Callout>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Callout.Description"', () => {
            expect(CalloutDescription.displayName).toBe('Callout.Description')
        })
    })
})
