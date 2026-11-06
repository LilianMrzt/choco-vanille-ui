import { describe, expect, it } from 'vitest'

import { createSwitchSource } from '@stories/forms/switch/utils/create-switch-source/createSwitchSource.utils'

describe('createSwitchSource', () => {
    it('represents controlled state and current text controls', () => {
        const source = createSwitchSource('', {
            args: {
                checked: false,
                label: 'Enable "alerts"',
                error: 'Required',
                size: 'lg',
                required: true,
            },
        })

        expect(source).toContain('useState(false)')
        expect(source).toContain('checked={checked} onCheckedChange={setChecked}')
        expect(source).toContain('label={"Enable \\"alerts\\""}')
        expect(source).toContain('error={"Required"}')
        expect(source).toContain('size={"lg"}')
        expect(source).toContain(' required')
    })

    it('represents an uncontrolled initial state without a controlled value', () => {
        const source = createSwitchSource('', {
            args: { label: 'Airplane mode', defaultChecked: true },
        })
        expect(source).toContain('defaultChecked={true}')
        expect(source).not.toContain('useState')
        expect(source).not.toContain(' checked=')
    })
})
