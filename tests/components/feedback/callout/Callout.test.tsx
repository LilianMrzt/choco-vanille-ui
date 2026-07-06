import { createRef } from 'react'
import { render } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import {
    Callout,
    CALLOUT_STYLES,
    type CalloutVariant,
} from '@components/feedback/callout'

// Preload the default variant icons so Iconify renders synchronously in JSDOM.
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
})

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

const VARIANTS: CalloutVariant[] = ['info', 'success', 'warning', 'error']

describe('Callout', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Callout />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('sets role="alert" on the root element by default', () => {
            const { container } = render(<Callout />)
            expect(getFirstChild(container).getAttribute('role')).toBe('alert')
        })

        it('allows overriding the role', () => {
            const { container } = render(<Callout role={'status'} />)
            expect(getFirstChild(container).getAttribute('role')).toBe('status')
        })

        it('renders title and description from convenience props', () => {
            const { getByText } = render(
                <Callout title={'Hello'} description={'World'} />,
            )
            expect(getByText('Hello')).toBeTruthy()
            expect(getByText('World')).toBeTruthy()
        })
    })

    describe('variant styling', () => {
        it.each(VARIANTS)(
            'applies a non-empty class for variant="%s"',
            (variant) => {
                const { container } = render(<Callout variant={variant} />)
                expect(getFirstChild(container).className.length).toBeGreaterThan(0)
            },
        )

        it('falls back to the info variant when none is provided', () => {
            const { container } = render(<Callout />)
            expect(getFirstChild(container).className).toContain(
                CALLOUT_STYLES.recipe({ variant: 'info' }),
            )
        })

        it('produces distinct class names for each variant', () => {
            const classNames = VARIANTS.map((variant) =>
                CALLOUT_STYLES.recipe({ variant }),
            )
            expect(new Set(classNames).size).toBe(VARIANTS.length)
        })
    })

    describe('compound subcomponents', () => {
        it('renders Callout.Icon, Callout.Title and Callout.Description', () => {
            const { getByText } = render(
                <Callout variant="warning">
                    <Callout.Icon icon="lucide:triangle-alert" />
                    <Callout.Title>Compound Title</Callout.Title>
                    <Callout.Description>Compound Description</Callout.Description>
                </Callout>,
            )
            expect(getByText('Compound Title')).toBeTruthy()
            expect(getByText('Compound Description')).toBeTruthy()
        })

        it('uses the default variant icon when no icon is provided', () => {
            const { container } = render(<Callout variant="success" />)
            expect(container.querySelector('svg')).toBeTruthy()
        })

        it('does not render a duplicate icon when Callout.Icon is provided as a child', () => {
            const { container } = render(
                <Callout variant="warning">
                    <Callout.Icon icon="lucide:triangle-alert" />
                    <Callout.Title>Title</Callout.Title>
                </Callout>,
            )
            expect(container.querySelectorAll('svg')).toHaveLength(1)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(<Callout className={'my-custom-class'} />)
            expect(getFirstChild(container).className).toContain('my-custom-class')
        })

        it('applies every base recipe class on the rendered element', () => {
            const { container } = render(<Callout />)
            for (const cls of CALLOUT_STYLES.recipe({}).split(' ')) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(<Callout data-testid="callout" />)
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'callout',
            )
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Callout ref={ref} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('displayName', () => {
        it('is set to "Callout" on the root', () => {
            expect(Callout.displayName).toBe('Callout')
        })

        it('is set on each sub-component', () => {
            expect(Callout.Icon.displayName).toBe('Callout.Icon')
            expect(Callout.Title.displayName).toBe('Callout.Title')
            expect(Callout.Description.displayName).toBe('Callout.Description')
        })
    })
})
