import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/feedback/progress/constants'
import { createProgressSource } from '@stories/feedback/progress/utils/create-progress-source/createProgressSource.utils'

describe('createProgressSource', () => {
    it('serializes current controls and accessible labels', () => {
        const source = createProgressSource('', { args: { ...DEFAULT_ARGS, value: 78, label: 'Uploading "file"', quantityLabel: '7/9' } })

        expect(source).toContain('value={78}')
        expect(source).toContain('label={"Uploading \\"file\\""}')
        expect(source).toContain('quantityLabel={"7/9"}')
        expect(source).toContain('borderRadius={6}')
    })
})
