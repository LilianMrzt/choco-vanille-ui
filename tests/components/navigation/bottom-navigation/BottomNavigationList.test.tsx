import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BottomNavigationList } from '@components/navigation/bottom-navigation/components/bottom-navigation-list'

describe('BottomNavigationList', () => {
    it('renders a list and forwards its class name', () => {
        render(
            <BottomNavigationList className={'custom-list'}>
                <li>Home</li>
            </BottomNavigationList>,
        )

        expect(screen.getByRole('list').className).toContain('custom-list')
        expect(screen.getByRole('listitem')).toBeTruthy()
    })

    it('applies the spacing token passed through the gap prop', () => {
        render(
            <BottomNavigationList gap={'lg'}>
                <li>Home</li>
            </BottomNavigationList>,
        )

        expect(screen.getByRole('list').style.gap).toBe('var(--space-lg)')
    })

    it('applies custom width constraints to the item row', () => {
        render(
            <BottomNavigationList
                width={'90%'}
                maxWidth={'24rem'}
            >
                <li>Home</li>
            </BottomNavigationList>,
        )

        const list = screen.getByRole('list')
        expect(list.style.width).toBe('90%')
        expect(list.style.maxWidth).toBe('24rem')
    })
})
