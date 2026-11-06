import type { ReactElement } from 'react'

import { Stepper } from '@components/navigation/stepper'

/**
 * Demonstrates orientation, size, disabled and custom content.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Stepper examples.
 * @example
 * <StepperExamples />
 */
const StepperExamples = (): ReactElement => (
    <div style={{ display: 'grid', gap: '2rem', width: '32rem', maxWidth: '100%' }}>
        <Stepper
            aria-label={'Horizontal progress'}
            currentStep={2}
        >
            <Stepper.Item label={'Account'} />
            <Stepper.Item label={'Preferences'} />
            <Stepper.Item label={'Review'} />
        </Stepper>
        <Stepper
            aria-label={'Vertical progress'}
            currentStep={2}
            orientation={'vertical'}
        >
            <Stepper.Item
                label={'Account'}
                size={'sm'}
            />
            <Stepper.Item
                label={'Preferences'}
                size={'sm'}
            />
            <Stepper.Item
                label={'Review'}
                size={'sm'}
            />
        </Stepper>
        <Stepper
            aria-label={'Disabled step'}
            currentStep={2}
            onStepChange={() => {}}
        >
            <Stepper.Item label={'Account'} />
            <Stepper.Item label={'Preferences'} />
            <Stepper.Item
                label={'Payment'}
                disabled
            />
        </Stepper>
        <Stepper
            aria-label={'Custom progress'}
            currentStep={3}
        >
            <Stepper.Item label={'Account'} />
            <Stepper.Item><strong>Custom content</strong></Stepper.Item>
            <Stepper.Item label={'Review'} />
        </Stepper>
    </div>
)

export default StepperExamples
