import { memo, useContext } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { StepperItemContext } from '@components/navigation/stepper/context/Stepper.context.ts'
import { STEPPER_STYLES } from '@components/navigation/stepper/styles/Stepper.css.ts'
import type { StepperItemProps } from '@components/navigation/stepper/components/stepper-item/types/StepperItem.props.ts'
import { cn } from '@utils/cn.ts'

const StepperItem = memo(
    ({ label, description, disabled, children }: StepperItemProps) => {
        const context = useContext(StepperItemContext)

        if (!context) {
            throw new Error('Stepper.Item must be rendered inside Stepper.')
        }

        const {
            stepNumber,
            isCurrent,
            isCompleted,
            onStepChange,
        } = context
        const isInteractive = Boolean(onStepChange)
        const hasCustomContent = children !== undefined
        const isTitleOnly = !hasCustomContent && !description
        const marker = isCompleted ? (
            <Icon
                icon={'lucide:check'}
                size={'sm'}
            />
        ) : (
            <Typography
                as={'span'}
                variant={'span'}
                display={'flex'}
                width={'100%'}
                style={{ height: '100%' }}
                className={STEPPER_STYLES.markerValue}
            >
                {stepNumber}
            </Typography>
        )
        const content = hasCustomContent ? (
            children
        ) : (
            <span
                className={cn(
                    STEPPER_STYLES.content,
                    isTitleOnly && STEPPER_STYLES.contentCentered,
                )}
            >
                <Typography
                    as={'span'}
                    variant={'span'}
                    fontSize={'sm'}
                    className={STEPPER_STYLES.label}
                >
                    {label}
                </Typography>
                {description && (
                    <Typography
                        as={'span'}
                        variant={'span'}
                        fontSize={'xs'}
                        className={STEPPER_STYLES.description}
                    >
                        {description}
                    </Typography>
                )}
            </span>
        )

        return (
            <>
                <span
                    className={cn(
                        STEPPER_STYLES.marker,
                        isCurrent && STEPPER_STYLES.markerCurrent,
                        isCompleted && STEPPER_STYLES.markerCompleted,
                    )}
                    aria-hidden={'true'}
                >
                    {marker}
                </span>
                {isInteractive ? (
                    <button
                        type={'button'}
                        className={cn(
                            STEPPER_STYLES.interactive,
                            isTitleOnly && STEPPER_STYLES.itemContentCentered,
                        )}
                        disabled={disabled}
                        aria-current={isCurrent ? 'step' : undefined}
                        onClick={() => {
                            if (!disabled) {
                                onStepChange?.(stepNumber)
                            }
                        }}
                    >
                        {content}
                    </button>
                ) : (
                    <span
                        className={isTitleOnly ? STEPPER_STYLES.itemContentCentered : undefined}
                        aria-current={isCurrent ? 'step' : undefined}
                    >
                        {content}
                    </span>
                )}
            </>
        )
    },
)

StepperItem.displayName = 'Stepper.Item'

export default StepperItem
