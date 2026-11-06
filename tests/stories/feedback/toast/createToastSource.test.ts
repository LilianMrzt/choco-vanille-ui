import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/feedback/toast/constants'
import { createToastSource } from '@stories/feedback/toast/utils/create-toast-source/createToastSource.utils'

describe('createToastSource', () => {
    it('reflects compound controls and escapes labels', () => {
        const source = createToastSource('', {
            args: { ...DEFAULT_ARGS, variant: 'error', role: 'none', title: 'An "error"', showCustomIcon: true, showActions: true, showClose: false },
        })

        expect(source).toContain('import { Toast, Button }')
        expect(source).toContain('variant={"error"} role={"none"}')
        expect(source).toContain('{"An \\"error\\""}')
        expect(source).toContain('<Toast.Icon icon={InfoIcon} />')
        expect(source).toContain('<Toast.Actions>')
        expect(source).not.toContain('<Toast.Close')
    })
})
