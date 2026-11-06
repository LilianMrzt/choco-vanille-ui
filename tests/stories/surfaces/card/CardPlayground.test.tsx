import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CardPlayground from '@stories/surfaces/card/components/card-playground/CardPlayground'

describe('CardPlayground', () => {
    it('assigns composition controls to slots and forwards root props', () => {
        render(
            <CardPlayground
                as={'article'}
                bodyPadding={0}
                data-testid={'card'}
                footerActionLabel={'Apply'}
                showFooter
                title={'Account'}
                titleAs={'h2'}
            />,
        )

        const card = screen.getByTestId('card')
        expect(card.tagName).toBe('ARTICLE')
        expect(card.hasAttribute('bodyPadding')).toBe(false)
        expect(screen.getByRole('heading', { level: 2, name: 'Account' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Apply' })).toBeTruthy()
    })

    it('omits the footer when disabled', () => {
        render(<CardPlayground showFooter={false} title={'Account'} />)
        expect(screen.queryByRole('button', { name: 'Save changes' })).toBeNull()
    })
})
