import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
    Toast,
    TOAST_STYLES,
    type ToastVariant,
} from '@components/feedback/toast'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('Toast', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<Toast description={'Hello'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders the description text', () => {
            render(<Toast description={'Something happened'} />)
            expect(screen.getByText('Something happened')).toBeTruthy()
        })

        it('renders the title when provided', () => {
            render(<Toast title={'Heads up'} description={'Details here'} />)
            expect(screen.getByText('Heads up')).toBeTruthy()
        })

        it('does not render a close button when onClose is omitted', () => {
            render(<Toast description={'No close'} />)
            expect(screen.queryByRole('button')).toBeNull()
        })
    })

    describe('variant styling', () => {
        const variants: ToastVariant[] = ['info', 'success', 'warning', 'error']

        it.each(variants)(
            'applies a non-empty class for variant="%s"',
            (variant) => {
                const { container } = render(
                    <Toast variant={variant} description={'msg'} />,
                )
                expect(getFirstChild(container).className.length).toBeGreaterThan(0)
            },
        )

        it('falls back to the info variant when none is provided', () => {
            const { container } = render(<Toast description={'msg'} />)
            const expectedClasses = TOAST_STYLES.recipe({ variant: 'info' }).split(
                ' ',
            )
            for (const cls of expectedClasses) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) =>
                TOAST_STYLES.recipe({ variant }),
            )
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('role', () => {
        it('defaults to role="status"', () => {
            const { container } = render(<Toast description={'msg'} />)
            expect(getFirstChild(container).getAttribute('role')).toBe('status')
        })

        it('can render as role="alert"', () => {
            const { container } = render(
                <Toast role={'alert'} description={'msg'} />,
            )
            expect(getFirstChild(container).getAttribute('role')).toBe('alert')
        })

        it('omits the role attribute when role is "none"', () => {
            const { container } = render(<Toast role={'none'} description={'msg'} />)
            expect(getFirstChild(container).getAttribute('role')).toBeNull()
        })
    })

    describe('close action', () => {
        it('renders a close button when onClose is provided', () => {
            render(<Toast description={'msg'} onClose={() => {}} />)
            expect(
                screen.getByRole('button', { name: 'Close notification' }),
            ).toBeTruthy()
        })

        it('calls onClose when the close button is clicked', async () => {
            const onClose = vi.fn()
            render(<Toast description={'msg'} onClose={onClose} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClose).toHaveBeenCalledTimes(1)
        })

        it('uses a custom closeLabel', () => {
            render(
                <Toast description={'msg'} onClose={() => {}} closeLabel={'Dismiss'} />,
            )
            expect(screen.getByRole('button', { name: 'Dismiss' })).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Toast className={'my-toast'} description={'msg'} />,
            )
            expect(getFirstChild(container).className).toContain('my-toast')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Toast ref={ref} description={'msg'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('displayName', () => {
        it('is set to "Toast"', () => {
            expect(Toast.displayName).toBe('Toast')
        })
    })

    describe('compound composition', () => {
        it('renders Toast.Actions children inside the toast', () => {
            render(
                <Toast>
                    <Toast.Title>Heads up</Toast.Title>
                    <Toast.Description>Something happened</Toast.Description>
                    <Toast.Actions>
                        <button type="button">Undo</button>
                        <button type="button">Retry</button>
                    </Toast.Actions>
                </Toast>,
            )
            expect(screen.getByText('Undo')).toBeTruthy()
            expect(screen.getByText('Retry')).toBeTruthy()
        })

        it('only includes the actions grid row when Toast.Actions is present', () => {
            const withoutActions = render(
                <Toast>
                    <Toast.Description>Something happened</Toast.Description>
                </Toast>,
            )
            expect(withoutActions.container.firstElementChild?.className).toContain(
                TOAST_STYLES.recipe({ variant: 'info', actions: false }),
            )

            withoutActions.unmount()

            const withActions = render(
                <Toast>
                    <Toast.Description>Something happened</Toast.Description>
                    <Toast.Actions>
                        <button type="button">Undo</button>
                    </Toast.Actions>
                </Toast>,
            )
            expect(withActions.container.firstElementChild?.className).toContain(
                TOAST_STYLES.recipe({ variant: 'info', actions: true }),
            )
        })

        it('exposes Toast.Actions on the compound component', () => {
            expect(Toast.Actions).toBeDefined()
            expect(Toast.Actions.displayName).toBe('Toast.Actions')
        })
    })
})
