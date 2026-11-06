import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/navigation/stepper/constants'
import { createStepperSource } from '@stories/navigation/stepper/utils/create-stepper-source/createStepperSource.utils'

describe('createStepperSource', () => {
    it('reflects and escapes the playground controls', () => {
        const source = createStepperSource('', { args: { ...DEFAULT_ARGS, currentStep: 3, orientation: 'vertical', reviewLabel: 'Review "order"' } })

        expect(source).toContain('useState(3)')
        expect(source).toContain('orientation={"vertical"}')
        expect(source).toContain('label={"Review \\"order\\""}')
        expect(source).toContain('onStepChange={setCurrentStep}')
    })
})
