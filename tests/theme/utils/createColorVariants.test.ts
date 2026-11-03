import { describe, expect, expectTypeOf, it } from 'vitest'

import { vars } from '@theme/styles/contract/contract.css.ts'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

describe('createColorVariants', () => {
    it('maps every color token and supports transparent and additional overrides', () => {
        const variants = createColorVariants('color', {
            'primary.main': 'red',
            custom: 'rebeccapurple',
        })

        expect(Object.keys(variants)).toHaveLength(157)
        expect(variants['primary.main']).toEqual({ color: 'red' })
        expect(variants.background).toEqual({ color: vars.color.background })
        expect(variants.transparent).toEqual({ color: vars.color.transparent })
        expect(variants.currentColor).toEqual({ color: vars.color.currentColor })
        expect(variants.custom).toEqual({ color: 'rebeccapurple' })
        for (const style of Object.values(variants)) {
            expect(typeof style.color).toBe('string')
        }
        expectTypeOf<keyof typeof variants>().toEqualTypeOf<ThemeColor | 'custom'>()
    })
})
