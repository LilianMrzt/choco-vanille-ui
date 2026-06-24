import { describe, expect, it } from 'vitest'
import { useButton } from '@components/actions/button/hooks/useButton.hook.ts'
import type { ButtonVariant, ButtonSize } from '@components/actions/button'

// useButton is a pure function (no React state/effects),
// so it can be called directly — no renderHook needed.

describe('useButton', () => {
    describe('resolvedClassName', () => {
        it('includes base button classes', () => {
            const { resolvedClassName } = useButton({})
            expect(resolvedClassName).toContain('inline-flex')
        })

        it('uses rounded-sm', () => {
            const { resolvedClassName } = useButton({})
            expect(resolvedClassName).toContain('rounded-sm')
        })

        it('has no box-shadow class', () => {
            const { resolvedClassName } = useButton({})
            expect(resolvedClassName).not.toMatch(/\bshadow\b/)
        })

        it('includes default variant classes', () => {
            const { resolvedClassName } = useButton({ variant: 'default' })
            expect(resolvedClassName).toContain('bg-primary')
        })

        it('includes destructive variant classes', () => {
            const { resolvedClassName } = useButton({ variant: 'destructive' })
            expect(resolvedClassName).toContain('bg-destructive')
        })

        it('includes outline variant classes', () => {
            const { resolvedClassName } = useButton({ variant: 'outline' })
            expect(resolvedClassName).toContain('border')
        })

        it('includes ghost variant classes', () => {
            const { resolvedClassName } = useButton({ variant: 'ghost' })
            expect(resolvedClassName).toContain('hover:bg-accent')
        })

        it('includes sm size class', () => {
            const { resolvedClassName } = useButton({ size: 'sm' })
            expect(resolvedClassName).toContain('h-9')
        })

        it('includes lg size class', () => {
            const { resolvedClassName } = useButton({ size: 'lg' })
            expect(resolvedClassName).toContain('h-11')
        })

        it('includes icon size class', () => {
            const { resolvedClassName } = useButton({ size: 'icon' })
            expect(resolvedClassName).toContain('w-10')
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
