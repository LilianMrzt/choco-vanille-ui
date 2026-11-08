import { CLOSE_ICON as CloseIcon } from '@constants/icon-registry'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Callout, CALLOUT_ACTION_STYLES } from '@components/feedback/callout'
import CalloutAction from '@components/feedback/callout/components/callout-action/CalloutAction.tsx'

describe('CalloutAction', () => {
    it('is exposed as Callout.Action', () => {
        expect(Callout.Action).toBe(CalloutAction)
    })

    it('renders an icon button with the given aria-label', () => {
        render(
            <Callout>
                <Callout.Action aria-label={'Close'} icon={CloseIcon} />
            </Callout>,
        )
        const button = screen.getByRole('button', { name: 'Close' })
        expect(button.tagName.toLowerCase()).toBe('button')
        expect(button.className).toContain(CALLOUT_ACTION_STYLES.action)
    })

    it('forwards onClick to the button', () => {
        const onClick = vi.fn()
        render(
            <Callout>
                <Callout.Action aria-label={'Close'} icon={CloseIcon} onClick={onClick} />
            </Callout>,
        )
        fireEvent.click(screen.getByRole('button', { name: 'Close' }))
        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('renders the action outside the content column and reserves right padding', () => {
        const { container } = render(
            <Callout title={'Hello'}>
                <Callout.Action aria-label={'Close'} icon={CloseIcon} />
            </Callout>,
        )
        const root = container.firstElementChild as HTMLElement
        const button = screen.getByRole('button', { name: 'Close' })
        expect(root.lastElementChild).toBe(button)
    })
})
