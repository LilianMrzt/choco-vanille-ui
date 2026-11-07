import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Appearance, Sizes } from '@stories/navigation/bottom-navigation/BottomNavigation.stories'
import BottomNavigationAppearance from '@stories/navigation/bottom-navigation/components/appearance/BottomNavigationAppearance'
import BottomNavigationSizes from '@stories/navigation/bottom-navigation/components/sizes/BottomNavigationSizes'
import { createSizesSource } from '@stories/navigation/bottom-navigation/utils/create-sizes-source/createSizesSource.utils'

describe('BottomNavigationAppearance', () => {
    it('keeps height and parent-width comparisons in Sizes with all instances documented', () => {
        expect(Appearance.render).toBe(BottomNavigationAppearance)
        expect(Sizes.render).toBe(BottomNavigationSizes)
        const { rerender } = render(<BottomNavigationAppearance />)
        expect(screen.getAllByRole('navigation')).toHaveLength(1)
        expect(screen.queryByRole('heading', { name: 'Item heights' })).toBeNull()

        rerender(<BottomNavigationSizes />)
        expect(screen.getAllByRole('navigation')).toHaveLength(4)
        expect(screen.getByRole('heading', { name: 'Item heights' })).toBeTruthy()
        expect(screen.getByRole('heading', { name: 'Parent widths' })).toBeTruthy()
        const source = createSizesSource()
        expect(source.match(/<BottomNavigation\s/g)).toHaveLength(4)
        expect(source).toContain('height="3rem"')
        expect(source).toContain('height="4.5rem"')
        expect(source).toContain("width: '20rem'")
        expect(source).toContain("width: '48rem'")
        expect(source).not.toContain('bordered')
    })
})
