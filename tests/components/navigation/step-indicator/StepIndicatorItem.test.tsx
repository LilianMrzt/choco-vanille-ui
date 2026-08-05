import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import StepIndicatorItem from '@components/navigation/step-indicator/components/step-indicator-item/StepIndicatorItem.tsx'

describe('StepIndicatorItem', () => {
    it('requires the StepIndicator root context', () => {
        expect(() =>
            render(<StepIndicatorItem label={'Account'} />),
        ).toThrow('StepIndicator.Item must be rendered inside StepIndicator.')
    })
})
