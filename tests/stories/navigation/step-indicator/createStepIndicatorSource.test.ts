import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/navigation/step-indicator/constants'
import { createStepIndicatorSource } from '@stories/navigation/step-indicator/utils/create-step-indicator-source/createStepIndicatorSource.utils'

describe('createStepIndicatorSource', () => {
    it('reflects and escapes controls and includes a working controlled callback', () => {
        const source = createStepIndicatorSource('', { args: { ...DEFAULT_ARGS, currentStep: 3, reviewLabel: 'Review "order"' } })

        expect(source).toContain('useState(3)')
        expect(source).toContain('onStepChange={setCurrentStep}')
        expect(source).toContain('label={"Review \\"order\\""}')
        expect(source).toContain('label={"Confirmation"}')
    })
})
