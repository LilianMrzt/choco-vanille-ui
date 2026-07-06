import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Popover } from '@components/overlay/popover'
import { Button } from '@components/actions/button'

describe('Popover', () => {
    describe('accessibility', () => {
        it('gives the dialog a default accessible name', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content>Content</Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Popover' })).toBeTruthy()
        })

        it('allows the default accessible name to be customized for i18n', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content defaultAriaLabel={'Options'}>Content</Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Options' })).toBeTruthy()
        })

        it('prefers aria-label over the default', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content aria-label={'Custom label'}>Content</Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Custom label' })).toBeTruthy()
        })

        it('supports aria-labelledby', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content aria-labelledby={'title-id'}>
                        <h2 id={'title-id'}>Dialog title</h2>
                    </Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Dialog title' })).toBeTruthy()
        })
    })
})
