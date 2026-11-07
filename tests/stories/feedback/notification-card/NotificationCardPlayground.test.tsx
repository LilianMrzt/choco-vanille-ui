import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import NotificationCardPlayground from '@stories/feedback/notification-card/components/notification-card-playground/NotificationCardPlayground'
import { DEFAULT_ARGS } from '@stories/feedback/notification-card/constants'

describe('NotificationCardPlayground', () => {
    it('renders an explicitly composed icon by default', () => {
        render(<NotificationCardPlayground {...DEFAULT_ARGS} showClose={false} />)
        expect(screen.getByRole('status').querySelectorAll('svg')).toHaveLength(1)
    })

    it('removes and restores the icon through its composition control', () => {
        const { rerender } = render(
            <NotificationCardPlayground {...DEFAULT_ARGS} showClose={false} showIcon={false} />,
        )
        expect(screen.getByRole('status').querySelector('svg')).toBeNull()
        rerender(<NotificationCardPlayground {...DEFAULT_ARGS} showClose={false} showIcon />)
        expect(screen.getByRole('status').querySelectorAll('svg')).toHaveLength(1)
    })
})
