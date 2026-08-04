import {
    Children,
    Fragment,
    isValidElement,
    memo,
    type ReactElement,
} from 'react'

import { Separator } from '@components/layout/separator'
import StepperItem from '@components/navigation/stepper/components/stepper-item/StepperItem.tsx'
import type { StepperItemProps } from '@components/navigation/stepper/components/stepper-item/types/StepperItem.props.ts'
import { StepperItemContext } from '@components/navigation/stepper/context/Stepper.context.ts'
import { STEPPER_ORIENTATIONS } from '@components/navigation/stepper/constants'
import { STEPPER_STYLES } from '@components/navigation/stepper/styles/Stepper.css.ts'
import type { StepperProps } from '@components/navigation/stepper/types/Stepper.props.ts'
import type { StepperCompound } from '@components/navigation/stepper/types/StepperCompound.ts'
import { cn } from '@utils/cn.ts'

const Stepper = memo(
    ({
        'aria-label': ariaLabel,
        children,
        currentStep,
        onStepChange,
        orientation = STEPPER_ORIENTATIONS.horizontal,
        className,
        ref,
        ...props
    }: StepperProps) => {
        const items = Children.toArray(children).filter(
            (child): child is ReactElement<StepperItemProps> =>
                isValidElement<StepperItemProps>(child),
        )

        return (
            <nav
                ref={ref}
                aria-label={ariaLabel}
                className={cn(STEPPER_STYLES.root, className)}
                {...props}
            >
                <ol
                    className={cn(
                        STEPPER_STYLES.list,
                        orientation === STEPPER_ORIENTATIONS.horizontal
                            ? STEPPER_STYLES.listHorizontal
                            : STEPPER_STYLES.listVertical,
                    )}
                >
                    {items.map((item, index) => {
                        const stepNumber = index + 1
                        const isCurrent = stepNumber === currentStep
                        const isCompleted = stepNumber < currentStep

                        return (
                            <Fragment
                                key={item.key ?? `${stepNumber}-${item.props.label}`}
                            >
                                <li
                                    className={cn(
                                        STEPPER_STYLES.item,
                                        orientation === STEPPER_ORIENTATIONS.vertical &&
                                            STEPPER_STYLES.itemVertical,
                                    )}
                                >
                                    <StepperItemContext.Provider
                                        value={{
                                            stepNumber,
                                            isCurrent,
                                            isCompleted,
                                            onStepChange,
                                        }}
                                    >
                                        <StepperItem {...item.props} />
                                    </StepperItemContext.Provider>
                                </li>
                                {index < items.length - 1 && (
                                    <li
                                        aria-hidden={'true'}
                                        className={cn(
                                            STEPPER_STYLES.connectorItem,
                                            orientation === STEPPER_ORIENTATIONS.vertical &&
                                                STEPPER_STYLES.connectorItemVertical,
                                        )}
                                    >
                                        <Separator
                                            orientation={
                                                orientation === STEPPER_ORIENTATIONS.vertical
                                                    ? 'vertical'
                                                    : 'horizontal'
                                            }
                                            className={cn(
                                                STEPPER_STYLES.connector,
                                                orientation === STEPPER_ORIENTATIONS.vertical &&
                                                    STEPPER_STYLES.connectorVertical,
                                            )}
                                        />
                                    </li>
                                )}
                            </Fragment>
                        )
                    })}
                </ol>
            </nav>
        )
    },
) as unknown as StepperCompound

Stepper.displayName = 'Stepper'
Stepper.Item = StepperItem

export default Stepper
