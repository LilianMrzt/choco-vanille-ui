import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { toast } from 'sonner'

import { BUTTON_STYLES } from '@components/actions/button/Button.css.ts'
import ToasterPlayground from '@stories/feedback/toaster/components/toaster-playground/ToasterPlayground'
import ToasterStoryLayout from '@stories/feedback/toaster/components/toaster-story-layout/ToasterStoryLayout'
import { DEFAULT_ARGS } from '@stories/feedback/toaster/constants'

afterEach(() => { toast.dismiss() })

describe('ToasterStoryLayout', () => {
    it('shows a title-only toast independently of the description and action controls', async () => {
        render(
            <ToasterStoryLayout>
                <ToasterPlayground {...DEFAULT_ARGS} />
            </ToasterStoryLayout>,
        )
        await userEvent.click(screen.getByRole('button', { name: 'Show simple toast' }))
        const transient = screen.getByLabelText(/^Toasts/)
        await within(transient).findByText(DEFAULT_ARGS.title)
        expect(within(transient).queryByText(DEFAULT_ARGS.description)).toBeNull()
        expect(within(transient).queryByRole('button')).toBeNull()
    })

    it('renders compact ghost notification actions', async () => {
        render(
            <ToasterStoryLayout>
                <ToasterPlayground {...DEFAULT_ARGS} />
            </ToasterStoryLayout>,
        )
        await userEvent.click(screen.getByRole('button', { name: 'Show notification' }))
        const persistent = screen.getByLabelText(/^Notifications/)
        const action = await within(persistent).findByRole('button', { name: DEFAULT_ARGS.actionLabel })
        for (const className of BUTTON_STYLES.recipe({ variant: 'ghost', size: 'sm' }).split(' ')) {
            expect(action.classList.contains(className)).toBe(true)
        }
        await userEvent.click(action)
        await within(screen.getByLabelText(/^Toasts/)).findByText('Action completed')
    })

    it('keeps trigger controls in the canvas and mounts both viewports outside it', async () => {
        const { unmount } = render(
            <div
                data-testid={'canvas'}
                style={{ transform: 'scale(1)', overflow: 'hidden', width: 320, height: 180 }}
            >
                <ToasterStoryLayout toastPosition={'top-center'} notificationPosition={'bottom-left'}>
                    <ToasterPlayground {...DEFAULT_ARGS} />
                </ToasterStoryLayout>
            </div>,
        )
        const canvas = screen.getByTestId('canvas')
        expect(within(canvas).getByRole('button', { name: 'Show toast' })).toBeTruthy()
        await userEvent.click(within(canvas).getByRole('button', { name: 'Show toast' }))
        await userEvent.click(within(canvas).getByRole('button', { name: 'Show notification' }))

        const transient = screen.getByLabelText(/^Toasts/)
        const persistent = screen.getByLabelText(/^Notifications/)
        await within(transient).findByText(DEFAULT_ARGS.title)
        await within(persistent).findByText(DEFAULT_ARGS.title)
        expect(canvas.contains(transient)).toBe(false)
        expect(canvas.contains(persistent)).toBe(false)
        expect(transient.parentElement).toBe(document.body)
        expect(persistent.parentElement).toBe(document.body)
        expect(transient.querySelector('ol')?.getAttribute('data-x-position')).toBe('center')
        expect(persistent.querySelector('ol')?.getAttribute('data-x-position')).toBe('left')
        unmount()
        expect(screen.queryByLabelText(/^Toasts/)).toBeNull()
        expect(screen.queryByLabelText(/^Notifications/)).toBeNull()
    })

    it('updates viewport configuration without mounting duplicate channels', () => {
        const { rerender } = render(
            <ToasterStoryLayout toastLabel={'Updates'} notificationLabel={'Inbox'}>
                <button>Story</button>
            </ToasterStoryLayout>,
        )
        expect(screen.getAllByLabelText(/^Updates/)).toHaveLength(1)
        expect(screen.getAllByLabelText(/^Inbox/)).toHaveLength(1)
        rerender(
            <ToasterStoryLayout toastLabel={'New updates'} notificationLabel={'New inbox'}>
                <button>Story</button>
            </ToasterStoryLayout>,
        )
        expect(screen.queryByLabelText(/^Updates/)).toBeNull()
        expect(screen.queryByLabelText(/^Inbox/)).toBeNull()
        expect(screen.getAllByLabelText(/^New updates/)).toHaveLength(1)
        expect(screen.getAllByLabelText(/^New inbox/)).toHaveLength(1)
    })
})
