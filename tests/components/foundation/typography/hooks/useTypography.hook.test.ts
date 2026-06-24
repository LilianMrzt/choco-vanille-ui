import { Slot } from '@radix-ui/react-slot'
import { describe, expect, it } from 'vitest'
import { useTypography } from '@components/foundation/typography/hooks/useTypography.hook.ts'
import { TYPOGRAPHY_ELEMENT_MAP, type TypographyVariant } from '@components/foundation/typography'

// useTypography is a pure function (no React state/effects),
// so it can be called directly — no renderHook needed.

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
        it('includes the variant CSS classes for h1', () => {
            const { resolvedClassName } = useTypography({ variant: 'h1' })
            expect(resolvedClassName).toContain('text-5xl')
            expect(resolvedClassName).toContain('font-extrabold')
        })

        it('includes the fontSize override class', () => {
            const { resolvedClassName } = useTypography({ variant: 'p', fontSize: 'xl' })
            expect(resolvedClassName).toContain('text-xl')
        })

        it('includes the fontWeight override class', () => {
            const { resolvedClassName } = useTypography({ variant: 'p', fontWeight: 'bold' })
            expect(resolvedClassName).toContain('font-bold')
        })

        it('includes `truncate` when ellipsis=true', () => {
            const { resolvedClassName } = useTypography({ ellipsis: true })
            expect(resolvedClassName).toContain('truncate')
        })

        it('does not include `truncate` when ellipsis is not set', () => {
            const { resolvedClassName } = useTypography({ variant: 'p' })
            expect(resolvedClassName).not.toContain('truncate')
        })

        it('merges a custom className', () => {
            const { resolvedClassName } = useTypography({ className: 'my-custom-class' })
            expect(resolvedClassName).toContain('my-custom-class')
        })

        it('Tailwind-merges conflicting font-size: fontSize overrides the variant default', () => {
            // h1 brings text-5xl; fontSize="sm" should win → only text-sm in output
            const { resolvedClassName } = useTypography({ variant: 'h1', fontSize: 'sm' })
            expect(resolvedClassName).toContain('text-sm')
            expect(resolvedClassName).not.toContain('text-5xl')
        })
    })
})
