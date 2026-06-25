import { describe, expect, it } from 'vitest'
import { useButton } from '@components/actions/button/hooks/useButton.hook.ts'
import { buttonRecipe } from '@components/actions/button/Button.css.ts'
import type { ButtonVariant, ButtonSize } from '@components/actions/button'

// useButton is a pure function (no React state/effects),
// so it can be called directly — no renderHook needed.

describe('useButton', () => {
    describe('resolvedClassName', () => {
        it('returns the recipe class for the default variant/size when called empty', () => {
            const { resolvedClassName } = useButton({})
            expect(resolvedClassName).toBe(buttonRecipe({}))
        })

        it('returns a non-empty string', () => {
            const { resolvedClassName } = useButton({})
            expect(resolvedClassName.length).toBeGreaterThan(0)
        })

        it('produces distinct classes for each variant', () => {
            const variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost']
            const classNames = variants.map((variant) => useButton({ variant }).resolvedClassName)
            expect(new Set(classNames).size).toBe(variants.length)
        })

        it('produces distinct classes for each size', () => {
            const sizes: ButtonSize[] = ['default', 'sm', 'lg', 'icon']
            const classNames = sizes.map((size) => useButton({ size }).resolvedClassName)
            expect(new Set(classNames).size).toBe(sizes.length)
        })

        it('merges a custom className', () => {
            const { resolvedClassName } = useButton({ className: 'my-custom-class' })
            expect(resolvedClassName).toContain('my-custom-class')
        })

        it('applies all variants without throwing', () => {
            const variants: ButtonVariant[] = ['default', 'destructive', 'outline', 'secondary', 'ghost']
            for (const variant of variants) {
                expect(() => useButton({ variant })).not.toThrow()
            }
        })

        it('applies all sizes without throwing', () => {
            const sizes: ButtonSize[] = ['default', 'sm', 'lg', 'icon']
            for (const size of sizes) {
                expect(() => useButton({ size })).not.toThrow()
            }
        })
    })
})
