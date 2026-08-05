import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Backdrop } from '@components/overlay'
import { Dialog } from '@components/overlay/dialog'

describe('Backdrop', () => {
    it('renders the shared Base UI dialog backdrop', () => {
        render(
            <Dialog defaultOpen>
                <Backdrop />
            </Dialog>,
        )

        expect(screen.getByRole('presentation')).toBeTruthy()
    })
})
