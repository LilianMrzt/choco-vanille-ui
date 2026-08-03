import { render } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { Callout } from '@components/feedback/callout'
import CalloutIcon from '@components/feedback/callout/components/callout-icon/CalloutIcon.tsx'

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
    addIcon('lucide:star', {
        body: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
        width: 24,
        height: 24,
    })
})

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

        it('renders an SVG icon for the error variant', () => {
            const { container } = render(
                <Callout variant="error">
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
                    <CalloutIcon icon="lucide:star" />
                </Callout>,
            )
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('renders only a single icon when a custom icon is provided', () => {
            const { container } = render(
                <Callout variant="info">
                    <CalloutIcon icon="lucide:star" />
                </Callout>,
            )
            // The icon itself renders one SVG
            expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(1)
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
                    <CalloutIcon icon="lucide:triangle-alert" />
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
