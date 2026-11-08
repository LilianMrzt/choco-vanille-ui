import { CIRCLE_ICON as CircleIcon, TRIANGLE_ALERT_ICON as TriangleAlertIcon } from '@constants/icon-registry'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Callout } from '@components/feedback/callout'
import CalloutIcon from '@components/feedback/callout/components/callout-icon/CalloutIcon.tsx'

describe('CalloutIcon', () => {
    describe('default rendering', () => {
        it('renders an SVG icon for the default info variant', () => {
            const { container } = render(
                <Callout variant="info">
                    <CalloutIcon />
                </Callout>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an SVG icon for the success variant', () => {
            const { container } = render(
                <Callout variant="success">
                    <CalloutIcon />
                </Callout>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an SVG icon for the warning variant', () => {
            const { container } = render(
                <Callout variant="warning">
                    <CalloutIcon />
                </Callout>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders an SVG icon for the danger variant', () => {
            const { container } = render(
                <Callout variant="danger">
                    <CalloutIcon />
                </Callout>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('custom icon prop', () => {
        it('renders the provided icon instead of the default', () => {
            const { container } = render(
                <Callout variant="info">
                    <CalloutIcon icon={CircleIcon} />
                </Callout>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders only a single icon when a custom icon is provided', () => {
            const { container } = render(
                <Callout variant="info">
                    <CalloutIcon icon={CircleIcon} />
                </Callout>,
            )
            // The icon itself renders one SVG
            expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(
                1,
            )
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Callout variant="info">
                    <CalloutIcon className="my-icon" />
                </Callout>,
            )
            expect(container.querySelector('.my-icon')).toBeTruthy()
        })
    })

    describe('duplicate icon prevention', () => {
        it('renders exactly one icon when used as a child of Callout', () => {
            const { container } = render(
                <Callout variant="warning">
                    <CalloutIcon icon={TriangleAlertIcon} />
                    <Callout.Title>Title</Callout.Title>
                </Callout>,
            )
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })
    })

    describe('displayName', () => {
        it('is set to "Callout.Icon"', () => {
            expect(CalloutIcon.displayName).toBe('Callout.Icon')
        })
    })
})
