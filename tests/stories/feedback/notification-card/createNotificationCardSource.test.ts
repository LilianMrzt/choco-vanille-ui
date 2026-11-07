import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/feedback/notification-card/constants'
import { createNotificationCardSource } from '@stories/feedback/notification-card/utils/create-notification-card-source/createNotificationCardSource.utils'

describe('createNotificationCardSource', () => {
    it('explicitly includes the default icon in the consumer snippet', () => {
        const source = createNotificationCardSource('', { args: DEFAULT_ARGS })
        expect(source).toContain('<NotificationCard.Icon />')
        expect(source.indexOf('<NotificationCard.Icon />')).toBeLessThan(source.indexOf('<NotificationCard.Title>'))
    })

    it('omits both the icon and its import note when the slot is disabled', () => {
        const source = createNotificationCardSource('', { args: { ...DEFAULT_ARGS, showIcon: false, showCustomIcon: true } })
        expect(source).not.toContain('<NotificationCard.Icon')
        expect(source).not.toContain('Supply InfoIcon')
    })

    it('reflects compound controls and escapes labels', () => {
        const source = createNotificationCardSource('', {
            args: { ...DEFAULT_ARGS, variant: 'danger', role: 'none', title: 'An "error"', showCustomIcon: true, showActions: true, showClose: false },
        })

        expect(source).toContain('import { Box, NotificationCard, Button }')
        expect(source).toContain('variant={"danger"} role={"none"}')
        expect(source).toContain('{"An \\"error\\""}')
        expect(source).toContain('<NotificationCard.Icon icon={InfoIcon} />')
        expect(source).toContain('<NotificationCard.Actions>')
        expect(source).toContain('<NotificationCard.Header>')
        expect(source).toContain('<NotificationCard.Body>')
        expect(source).toContain('<NotificationCard.Footer>')
        expect(source).not.toContain('<NotificationCard.Close')
    })
})
