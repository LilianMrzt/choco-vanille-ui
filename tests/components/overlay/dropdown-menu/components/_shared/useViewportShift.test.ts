import { describe, expect, it } from 'vitest'

import { useViewportShift as sharedUseViewportShift } from '@components/overlay/dropdown-menu/components/_shared/useViewportShift.ts'
import { useViewportShift as canonicalUseViewportShift } from '@hooks/use-viewport-shift/useViewportShift.hook.ts'

describe('dropdown-menu shared useViewportShift re-export', () => {
    it('re-exports the canonical useViewportShift hook', () => {
        expect(sharedUseViewportShift).toBe(canonicalUseViewportShift)
    })
})
