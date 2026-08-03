import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Callout } from '@components/feedback/callout'
import CalloutTitle from '@components/feedback/callout/components/callout-title/CalloutTitle.tsx'

describe('CalloutTitle', () => {
    describe('default rendering', () => {
        it('renders its text children', () => {
            render(<Callout><CalloutTitle>Important notice</CalloutTitle></Callout>)
            expect(screen.getByText('Important notice')).toBeTruthy()
        })

        it('renders complex children', () => {
            render(
                <Callout>
                    <CalloutTitle>
                        <span data-testid="inner">Inner</span>
                    </CalloutTitle>
                </Callout>,
            )
            expect(screen.getByTestId('inner')).toBeTruthy()
        })

        it('renders a <span> element by default', () => {
            render(
                <Callout>
                    <CalloutTitle>Title</CalloutTitle>
                </Callout>,
            )
            const title = screen.getByText('Title')
            expect(title.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Callout>
                    <CalloutTitle className="my-title">Title</CalloutTitle>
                </Callout>,
            )
            expect(container.querySelector('.my-title')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Callout>
                    <CalloutTitle data-testid="callout-title">Title</CalloutTitle>
                </Callout>,
            )
            expect(container.querySelector('[data-testid="callout-title"]')).toBeTruthy()
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLSpanElement>()
            render(
                <Callout>
                    <CalloutTitle ref={ref}>Title</CalloutTitle>
                </Callout>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Callout.Title"', () => {
            expect(CalloutTitle.displayName).toBe('Callout.Title')
        })
    })
})
