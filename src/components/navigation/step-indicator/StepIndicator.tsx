import {
    Children,
    isValidElement,
    memo,
    type ReactElement,
} from 'react'

import StepIndicatorItem from '@components/navigation/step-indicator/components/step-indicator-item/StepIndicatorItem.tsx'
import type { StepIndicatorItemProps } from '@components/navigation/step-indicator/components/step-indicator-item/types/StepIndicatorItem.props.ts'
import { StepIndicatorContext } from '@components/navigation/step-indicator/context/StepIndicator.context.ts'
import { STEP_INDICATOR_STYLES } from '@components/navigation/step-indicator/styles/StepIndicator.css.ts'
import type { StepIndicatorProps } from '@components/navigation/step-indicator/types/StepIndicator.props.ts'
import type { StepIndicatorCompound } from '@components/navigation/step-indicator/types/StepIndicatorCompound.ts'
import { cn } from '@utils/cn.ts'

/**
 * Minimal dot-based step progress indicator rendered as a `<nav>` with an
 * ordered list. Tracks `currentStep` to derive completed and current states
 * for each `StepIndicator.Item`.
 *
 * Compound slot: `StepIndicator.Item`.
 */
const StepIndicator = memo(
    ({
        'aria-label': ariaLabel,
        children,
        currentStep,
        onStepChange,
        className,
        ref,
        ...props
    }: StepIndicatorProps) => {
        const items = Children.toArray(children).filter(
            (child): child is ReactElement<StepIndicatorItemProps> =>
                isValidElement<StepIndicatorItemProps>(child),
        )

        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                className={cn(STEP_INDICATOR_STYLES.root, className)}
                {...props}
            >
                <ol className={STEP_INDICATOR_STYLES.list}>
                    {items.map((item, index) => {
                        const stepNumber = index + 1
                        const isCurrent = stepNumber === currentStep
                        const isCompleted = stepNumber < currentStep

                        return (
                            <li key={item.key ?? `${stepNumber}-${item.props.label}`}>
                                <StepIndicatorContext.Provider
                                    value={{
                                        stepNumber,
                                        isCurrent,
                                        isCompleted,
                                        onStepChange,
                                    }}
                                >
                                    <StepIndicatorItem {...item.props} />
                                </StepIndicatorContext.Provider>
                            </li>
                        )
                    })}
                </ol>
            </nav>
        )
    },
) as unknown as StepIndicatorCompound

StepIndicator.displayName = 'StepIndicator'
StepIndicator.Item = StepIndicatorItem

export default StepIndicator
