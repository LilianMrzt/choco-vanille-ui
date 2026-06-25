import { Slot } from '@radix-ui/react-slot'
import { describe, expect, it } from 'vitest'
import { useTypography } from '@components/foundation/typography/hooks/useTypography.hook.ts'
import { typographyRecipe } from '@components/foundation/typography/Typography.styles.css.ts'
import { TYPOGRAPHY_ELEMENT_MAP, type TypographyVariant } from '@components/foundation/typography'

// useTypography is a pure function (no React state/effects),
// so it can be called directly — no renderHook needed.

/** Class names present in `a` but not in `b` — used to isolate a variant's class. */
const onlyIn = (a: string, b: string): string[] => {
    const bSet = new Set(b.split(' '))
    return a.split(' ').filter((cls) => cls && !bSet.has(cls))
}

describe('useTypography', () => {
    describe('element resolution', () => {
        it('maps every variant to its corresponding HTML element', () => {
            const variants = Object.keys(TYPOGRAPHY_ELEMENT_MAP) as TypographyVariant[]
            for (const variant of variants) {
                const { element } = useTypography({ variant })
                expect(element).toBe(TYPOGRAPHY_ELEMENT_MAP[variant])
            }
        })

        it('falls back to <p> when variant is undefined', () => {
            const { element } = useTypography({})
            expect(element).toBe('p')
        })

        it('overrides the element with the `as` prop regardless of variant', () => {
            expect(useTypography({ variant: 'h1', as: 'span' }).element).toBe('span')
            expect(useTypography({ variant: 'p', as: 'div' }).element).toBe('div')
        })

        it('returns Slot when asChild=true, ignoring variant and as', () => {
            expect(useTypography({ asChild: true, variant: 'h1' }).element).toBe(Slot)
            expect(useTypography({ asChild: true, as: 'div' }).element).toBe(Slot)
        })
    })

    describe('resolvedClassName', () => {
        it('matches the recipe output for a given variant', () => {
            const { resolvedClassName } = useTypography({ variant: 'h1' })
            expect(resolvedClassName).toBe(typographyRecipe({ variant: 'h1' }))
        })

        it('includes the fontSize override class', () => {
            const sizeClass = onlyIn(
                typographyRecipe({ variant: 'p', fontSize: 'xl' }),
                typographyRecipe({ variant: 'p' }),
            )[0]
            const { resolvedClassName } = useTypography({ variant: 'p', fontSize: 'xl' })
            expect(resolvedClassName).toContain(sizeClass)
        })

        it('includes the fontWeight override class', () => {
            const weightClass = onlyIn(
                typographyRecipe({ variant: 'p', fontWeight: 'bold' }),
                typographyRecipe({ variant: 'p' }),
            )[0]
            const { resolvedClassName } = useTypography({ variant: 'p', fontWeight: 'bold' })
            expect(resolvedClassName).toContain(weightClass)
        })

        it('includes the ellipsis class when ellipsis=true', () => {
            const ellipsis = onlyIn(
                typographyRecipe({ ellipsis: true }),
                typographyRecipe({}),
            )[0]
            const { resolvedClassName } = useTypography({ ellipsis: true })
            expect(resolvedClassName).toContain(ellipsis)
        })

        it('does not include the ellipsis class when ellipsis is not set', () => {
            const ellipsis = onlyIn(
                typographyRecipe({ ellipsis: true }),
                typographyRecipe({}),
            )[0]
            const { resolvedClassName } = useTypography({ variant: 'p' })
            expect(resolvedClassName).not.toContain(ellipsis)
        })

        it('merges a custom className', () => {
            const { resolvedClassName } = useTypography({ className: 'my-custom-class' })
            expect(resolvedClassName).toContain('my-custom-class')
        })

        it('applies both the variant and the fontSize override class', () => {
            const sizeClass = onlyIn(
                typographyRecipe({ variant: 'h1', fontSize: 'sm' }),
                typographyRecipe({ variant: 'h1' }),
            )[0]
            const { resolvedClassName } = useTypography({ variant: 'h1', fontSize: 'sm' })
            expect(resolvedClassName).toContain(sizeClass)
        })
    })
})
