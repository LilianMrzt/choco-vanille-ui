import { describe, expect, it } from 'vitest'

import { useTooltip } from '@components/overlay/tooltip/hooks/useTooltip.hook.ts'
import { tooltipContentClass } from '@components/overlay/tooltip/Tooltip.styles.css.ts'

// Suites

describe('useTooltip', () => {
    describe('resolvedClassName', () => {
        it('returns the base tooltip content class when no className is provided', () => {
            const { resolvedClassName } = useTooltip({})
            expect(resolvedClassName).toBe(tooltipContentClass)
        })

        it('merges a custom className with the base class', () => {
            const { resolvedClassName } = useTooltip({ className: 'my-custom-class' })
            expect(resolvedClassName).toContain('my-custom-class')
        })

        it('includes the base class even when a custom className is provided', () => {
            const { resolvedClassName } = useTooltip({ className: 'extra' })
            expect(resolvedClassName).toContain(tooltipContentClass)
            expect(resolvedClassName).toContain('extra')
        })

        it('returns a non-empty string', () => {
            const { resolvedClassName } = useTooltip({})
            expect(resolvedClassName.length).toBeGreaterThan(0)
        })
    })
})
