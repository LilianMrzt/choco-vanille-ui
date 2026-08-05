import { memo, useContext } from 'react'

import { STEP_INDICATOR_ITEM_STYLES } from '@components/navigation/step-indicator/components/step-indicator-item/styles/StepIndicatorItem.css.ts'
import { StepIndicatorContext } from '@components/navigation/step-indicator/context/StepIndicator.context.ts'
import type { StepIndicatorItemProps } from '@components/navigation/step-indicator/components/step-indicator-item/types/StepIndicatorItem.props.ts'
import { cn } from '@utils/cn.ts'

const StepIndicatorItem = memo(
    ({ label, disabled, ref }: StepIndicatorItemProps) => {
        const context = useContext(StepIndicatorContext)

        if (!context) {
            throw new Error(
                'StepIndicator.Item must be rendered inside StepIndicator.',
            )
        }

        const { stepNumber, isCurrent, isCompleted, onStepChange } = context
        const dot = (
            <span
                className={cn(
                    STEP_INDICATOR_ITEM_STYLES.dot,
                    isCurrent && STEP_INDICATOR_ITEM_STYLES.dotCurrent,
                    isCompleted && STEP_INDICATOR_ITEM_STYLES.dotCompleted,
                )}
                aria-hidden={'true'}
            />
        )

        if (onStepChange) {
            return (
                <button
                    ref={ref}
                    type={'button'}
                    className={STEP_INDICATOR_ITEM_STYLES.button}
                    aria-label={label}
                    aria-current={isCurrent ? 'step' : undefined}
                    disabled={disabled}
                    onClick={() => onStepChange(stepNumber)}
                >
                    {dot}
                </button>
            )
        }

        return (
            <span
                role={'img'}
                className={STEP_INDICATOR_ITEM_STYLES.staticItem}
                aria-label={label}
                aria-current={isCurrent ? 'step' : undefined}
            >
                {dot}
            </span>
        )
    },
)

StepIndicatorItem.displayName = 'StepIndicator.Item'

export default StepIndicatorItem
