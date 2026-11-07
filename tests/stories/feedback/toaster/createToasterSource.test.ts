import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/feedback/toaster/constants'
import { createToasterSource } from '@stories/feedback/toaster/utils/create-toaster-source/createToasterSource.utils'

describe('createToasterSource', () => {
    it('reflects both channels, positions, durations and compound actions', () => {
        const source = createToasterSource('', {
            args: {
                ...DEFAULT_ARGS,
                messageVariant: 'danger',
                title: 'An "error"',
                toastPosition: 'top-center',
                notificationDuration: 2000,
                actionLabel: 'Retry',
            },
        })

        expect(source).toContain('ToasterProvider, useNotification, useToast')
        expect(source).toContain('<ToasterProvider')
        expect(source).toContain('</ToasterProvider>')
        expect(source).not.toContain('<Toaster\n')
        expect(source).toContain('toastPosition={"top-center"}')
        expect(source).toContain('show("danger"')
        expect(source).toContain('title: "An \\"error\\""')
        expect(source).toContain('duration: 5000')
        expect(source).toContain('duration: 2000')
        expect(source).toContain('actions: <Button label={"Retry"}')
        expect(source).toContain('size="sm" variant="ghost"')
        expect(source).not.toMatch(/\{\{[a-zA-Z]/)
    })

    it('includes a title-only toast example even when descriptions and actions are enabled', () => {
        const source = createToasterSource('', { args: DEFAULT_ARGS })
        const trigger = source.split('\n').find((line) => line.includes('label="Show simple toast"'))
        expect(trigger).toContain(`title: ${JSON.stringify(DEFAULT_ARGS.title)}`)
        expect(trigger).toContain('duration: 5000')
        expect(trigger).not.toContain('description:')
        expect(trigger).not.toContain('actions:')
    })

    it('omits actions when disabled', () => {
        const source = createToasterSource('', { args: { ...DEFAULT_ARGS, showActions: false } })
        expect(source).not.toContain('actions:')
    })

    it('shows bottom-right toasts and top-right notifications with close labels only on notifications', () => {
        const source = createToasterSource('', { args: DEFAULT_ARGS })
        expect(source).toContain('toastPosition={"bottom-right"}')
        expect(source).toContain('notificationPosition={"top-right"}')
        const toastTrigger = source.split('\n').find((line) => line.includes('label="Show toast"'))
        const notificationTrigger = source.split('\n').find((line) => line.includes('label="Show notification"'))
        expect(toastTrigger).not.toContain('closeLabel:')
        expect(notificationTrigger).toContain('closeLabel: "Close notification"')
    })
})
