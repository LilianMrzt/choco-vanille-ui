import { describe, expect, expectTypeOf, it } from 'vitest'

import { vars } from '@theme/styles/contract/contract.css.ts'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'
import { createColorVariants } from '@theme/utils/createColorVariants.utils.ts'

describe('createColorVariants', () => {
    it('maps every color token and supports transparent and additional overrides', () => {
        const variants = createColorVariants('color', {
            primary: 'red',
            custom: 'rebeccapurple',
        })

        expect(Object.keys(variants)).toHaveLength(Object.keys(vars.color).length + 2)
        expect(variants.primary).toEqual({ color: 'red' })
        expect(variants.background).toEqual({ color: vars.color.background })
        expect(variants.transparent).toEqual({ color: 'transparent' })
        expect(variants.custom).toEqual({ color: 'rebeccapurple' })
        expectTypeOf<keyof typeof variants>().toEqualTypeOf<ThemeColor | 'transparent' | 'custom'>()
    })
})
