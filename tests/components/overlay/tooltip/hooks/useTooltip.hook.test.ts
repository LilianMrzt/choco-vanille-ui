import { describe, expect, it } from 'vitest'

import { useTooltip } from '@components/overlay/tooltip/hooks/useTooltip.hook.ts'
import { tooltipContentVariants } from '@components/overlay/tooltip/Tooltip.styles.ts'

// Suites

describe('useTooltip', () => {
    describe('resolvedClassName', () => {
        it('returns base tooltip content classes when no className is provided', () => {
            const { resolvedClassName } = useTooltip({})
            expect(resolvedClassName).toBe(tooltipContentVariants())
        })

        it('merges a custom className with the base classes', () => {
            const { resolvedClassName } = useTooltip({ className: 'my-custom-class' })
            expect(resolvedClassName).toContain('my-custom-class')
        })

        it('includes base classes even when a custom className is provided', () => {
            const base = tooltipContentVariants()
            const { resolvedClassName } = useTooltip({ className: 'extra' })
            // Every base class should still be present
            expect(resolvedClassName).toContain('z-50')
            expect(resolvedClassName).toContain('rounded-sm')
            expect(resolvedClassName.length).toBeGreaterThanOrEqual(base.length)
        })

        it('returns a non-empty string', () => {
            const { resolvedClassName } = useTooltip({})
            expect(resolvedClassName.length).toBeGreaterThan(0)
        })
    })
})
