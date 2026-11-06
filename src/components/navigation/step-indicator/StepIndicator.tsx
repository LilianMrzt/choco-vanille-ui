import {
    Children,
    isValidElement,
    memo,
    type ReactElement,
} from 'react'

import StepIndicatorItem from '@components/navigation/step-indicator/components/step-indicator-item/StepIndicatorItem.tsx'
import type { StepIndicatorItemProps } from '@components/navigation/step-indicator/components/step-indicator-item/types'
import { StepIndicatorContext } from '@components/navigation/step-indicator/context/StepIndicator.context.ts'
import { STEP_INDICATOR_STYLES } from '@components/navigation/step-indicator/StepIndicator.css.ts'
import type { StepIndicatorProps } from '@components/navigation/step-indicator/types'
import { cn } from '@utils/cn.ts'

/**
 * Minimal dot-based step progress indicator rendered as a `<nav>` with an
 * ordered list. Tracks `currentStep` to derive completed and current states
 * for each `StepIndicator.Item`.
 *
 * Compound slot: `StepIndicator.Item`.
 * @param props - Navigation attributes and step options.
 * @param props["aria-label"] - Accessible landmark name.
 * @param props.children - Ordered step items.
 * @param props.currentStep - Current one-based step.
 * @param props.onStepChange - Makes dots interactive and receives the selected step.
 * @param props.className - Additional navigation class.
 * @param props.ref - Ref to the navigation element.
 * @returns A step navigation landmark.
 * @example
 * <StepIndicator aria-label="Progress" currentStep={1}><StepIndicator.Item label="First" /></StepIndicator>
 */
const StepIndicatorRoot = memo(
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
)

StepIndicatorRoot.displayName = 'StepIndicator'

/**
 * Controlled step indicator with an item slot.
 * @example
 * <StepIndicator aria-label="Progress" currentStep={1}><StepIndicator.Item label="First" /></StepIndicator>
 */
const StepIndicator = Object.assign(StepIndicatorRoot, { Item: StepIndicatorItem })

export default StepIndicator
