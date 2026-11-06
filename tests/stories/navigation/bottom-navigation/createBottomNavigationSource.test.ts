import { describe, expect, it } from 'vitest'

import { createBottomNavigationSource } from '@stories/navigation/bottom-navigation/utils/create-bottom-navigation-source/createBottomNavigationSource.utils'

describe('createBottomNavigationSource', () => {
    it('serializes selection and slot controls', () => {
        const source = createBottomNavigationSource('', {
            args: {
                'aria-label': 'Mobile navigation',
                children: null,
                value: 'search',
                listGap: 8,
                itemShowLabel: false,
                itemAriaLabel: 'Start',
                itemDisabled: true,
                itemHeight: '4rem',
            },
        })

        expect(source).toContain('useState("search")')
        expect(source).toContain('aria-label={"Mobile navigation"}')
        expect(source).toContain('gap={8}')
        expect(source).toContain('aria-label={"Start"}')
        expect(source).toContain('disabled={true}')
        expect(source).toContain('height={"4rem"}')
    })
})
