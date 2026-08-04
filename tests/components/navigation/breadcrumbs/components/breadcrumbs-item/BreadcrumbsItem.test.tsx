import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Breadcrumbs } from '@components/navigation/breadcrumbs'

describe('Breadcrumbs.Item', () => {
    it('renders a linked item and forwards the Link interaction contract', async () => {
        const onClick = vi.fn()
        const user = userEvent.setup()

        render(
            <Breadcrumbs.Item
                label={'Home'}
                href={'/'}
                onClick={onClick}
            />,
        )

        const item = screen.getByRole('link', { name: 'Home' })
        await user.click(item)

        expect(item.getAttribute('href')).toBe('/')
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('renders the current item as text with an aria-current state', () => {
        render(
            <Breadcrumbs.Item
                label={'Details'}
                href={'/details'}
                current
            />,
        )

        expect(screen.queryByRole('link', { name: 'Details' })).toBeNull()
        expect(screen.getByText('Details').getAttribute('aria-current')).toBe('page')
    })
})
