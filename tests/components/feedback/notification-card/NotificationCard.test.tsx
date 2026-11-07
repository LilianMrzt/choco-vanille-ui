import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import {
    NotificationCard,
    NOTIFICATION_CARD_STYLES,
    type NotificationCardVariant,
} from '@components/feedback/notification-card'

const getFirstChild = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement

describe('NotificationCard', () => {
    describe('default rendering', () => {
        it('renders a <div> element by default', () => {
            const { container } = render(<NotificationCard description={'Hello'} />)
            expect(getFirstChild(container).tagName.toLowerCase()).toBe('div')
        })

        it('renders the description text', () => {
            render(<NotificationCard description={'Something happened'} />)
            expect(screen.getByText('Something happened')).toBeTruthy()
        })

        it('renders the title when provided', () => {
            render(<NotificationCard title={'Heads up'} description={'Details here'} />)
            expect(screen.getByText('Heads up')).toBeTruthy()
        })

        it('does not render a close button when onClose is omitted', () => {
            render(<NotificationCard description={'No close'} />)
            expect(screen.queryByRole('button')).toBeNull()
        })
    })

    describe('variant styling', () => {
        const variants: NotificationCardVariant[] = ['info', 'success', 'warning', 'danger']

        it.each(variants)(
            'applies a non-empty class for variant="%s"',
            (variant) => {
                const { container } = render(
                    <NotificationCard variant={variant} description={'msg'} />,
                )
                expect(getFirstChild(container).className.length).toBeGreaterThan(0)
            },
        )

        it('falls back to the info variant when none is provided', () => {
            const { container } = render(<NotificationCard description={'msg'} />)
            const expectedClasses = NOTIFICATION_CARD_STYLES.recipe({ variant: 'info' }).split(
                ' ',
            )
            for (const cls of expectedClasses) {
                expect(getFirstChild(container).className).toContain(cls)
            }
        })

        it('produces distinct class names for each variant', () => {
            const classNames = variants.map((variant) =>
                NOTIFICATION_CARD_STYLES.recipe({ variant }),
            )
            expect(new Set(classNames).size).toBe(variants.length)
        })
    })

    describe('role', () => {
        it('defaults to role="status"', () => {
            const { container } = render(<NotificationCard description={'msg'} />)
            expect(getFirstChild(container).getAttribute('role')).toBe('status')
        })

        it('can render as role="alert"', () => {
            const { container } = render(
                <NotificationCard role={'alert'} description={'msg'} />,
            )
            expect(getFirstChild(container).getAttribute('role')).toBe('alert')
        })

        it('omits the role attribute when role is "none"', () => {
            const { container } = render(<NotificationCard role={'none'} description={'msg'} />)
            expect(getFirstChild(container).getAttribute('role')).toBeNull()
        })
    })

    describe('close action', () => {
        it('renders a close button when onClose is provided', () => {
            render(<NotificationCard description={'msg'} onClose={() => {}} />)
            expect(
                screen.getByRole('button', { name: 'Close notification' }),
            ).toBeTruthy()
        })

        it('calls onClose when the close button is clicked', async () => {
            const onClose = vi.fn()
            render(<NotificationCard description={'msg'} onClose={onClose} />)
            await userEvent.click(screen.getByRole('button'))
            expect(onClose).toHaveBeenCalledTimes(1)
            expect(onClose).toHaveBeenCalledWith()
        })

        it('uses a custom closeLabel', () => {
            render(
                <NotificationCard description={'msg'} onClose={() => {}} closeLabel={'Dismiss'} />,
            )
            expect(screen.getByRole('button', { name: 'Dismiss' })).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('keeps a one-pixel border on every side through the layout primitive', () => {
            render(<NotificationCard title={'Saved'} />)
            const styles = getComputedStyle(screen.getByRole('status'))
            expect(styles.borderTopWidth).toBe('1px')
            expect(styles.borderRightWidth).toBe('1px')
            expect(styles.borderBottomWidth).toBe('1px')
            expect(styles.borderLeftWidth).toBe('1px')
        })

        it('merges a custom className', () => {
            const { container } = render(
                <NotificationCard className={'my-notification-card'} description={'msg'} />,
            )
            expect(getFirstChild(container).className).toContain('my-notification-card')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(<NotificationCard ref={ref} description={'msg'} />)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('displayName', () => {
        it('is set to "NotificationCard"', () => {
            expect(NotificationCard.displayName).toBe('NotificationCard')
        })
    })

    describe('compound composition', () => {
        it('detects slots inside fragments without injecting duplicate icons or close buttons', () => {
            render(
                <NotificationCard onClose={vi.fn()}>
                    <>
                        <NotificationCard.Header>
                            <>
                                <NotificationCard.Icon />
                                <NotificationCard.Title>Ready</NotificationCard.Title>
                                <NotificationCard.Close aria-label={'Dismiss'} />
                            </>
                        </NotificationCard.Header>
                        <NotificationCard.Footer>
                            <NotificationCard.Actions><button>Undo</button></NotificationCard.Actions>
                        </NotificationCard.Footer>
                    </>
                </NotificationCard>,
            )
            expect(screen.getAllByRole('button')).toHaveLength(2)
            expect(screen.getByRole('status').querySelectorAll('svg')).toHaveLength(2)
            expect(screen.getByRole('status').className).toContain(
                NOTIFICATION_CARD_STYLES.recipe({ variant: 'info' }),
            )
        })

        it('provides a working convenience close button with compound content', async () => {
            const onClose = vi.fn()
            render(
                <NotificationCard
                    closeLabel={'Dismiss update'}
                    onClose={onClose}
                >
                    <NotificationCard.Header>
                        <NotificationCard.Title>Ready</NotificationCard.Title>
                    </NotificationCard.Header>
                </NotificationCard>,
            )
            await userEvent.click(screen.getByRole('button', { name: 'Dismiss update' }))
            expect(onClose).toHaveBeenCalledTimes(1)
            expect(onClose).toHaveBeenCalledWith()
        })

        it('accepts rich title content without leaking custom props to the DOM', () => {
            render(
                <NotificationCard
                    data-testid={'card'}
                    description={'Details'}
                    title={<strong>Rich title</strong>}
                    variant={'success'}
                />,
            )
            const card = screen.getByTestId('card')
            expect(screen.getByText('Rich title').tagName).toBe('STRONG')
            expect(card.hasAttribute('title')).toBe(false)
            expect(card.hasAttribute('variant')).toBe(false)
            expect(card.hasAttribute('description')).toBe(false)
        })

        it('renders NotificationCard.Actions children inside the notification-card', () => {
            render(
                <NotificationCard>
                    <NotificationCard.Header>
                        <NotificationCard.Title>Heads up</NotificationCard.Title>
                    </NotificationCard.Header>
                    <NotificationCard.Body>
                        <NotificationCard.Description>Something happened</NotificationCard.Description>
                    </NotificationCard.Body>
                    <NotificationCard.Footer>
                        <NotificationCard.Actions>
                            <button type="button">Undo</button>
                            <button type="button">Retry</button>
                        </NotificationCard.Actions>
                    </NotificationCard.Footer>
                </NotificationCard>,
            )
            expect(screen.getByText('Undo')).toBeTruthy()
            expect(screen.getByText('Retry')).toBeTruthy()
        })

        it('allows body-only content without injecting a header or footer', () => {
            render(
                <NotificationCard>
                    <NotificationCard.Body data-testid={'body'}>
                        <NotificationCard.Description>Something happened</NotificationCard.Description>
                    </NotificationCard.Body>
                </NotificationCard>,
            )
            const root = screen.getByRole('status')
            expect(root.children).toHaveLength(1)
            expect(root.firstElementChild).toBe(screen.getByTestId('body'))
            expect(root.querySelector('svg')).toBeNull()
        })

        it('exposes NotificationCard.Actions on the compound component', () => {
            expect(NotificationCard.Actions).toBeDefined()
            expect(NotificationCard.Actions.displayName).toBe('NotificationCard.Actions')
        })
    })
})
