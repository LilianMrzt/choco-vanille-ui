import { CHECK_ICON as CheckIcon } from '@constants/icon-registry'
import { memo, useContext } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { StepperItemContext } from '@components/navigation/stepper/context/Stepper.context.ts'
import { STEPPER_ITEM_SIZES } from '@components/navigation/stepper/constants'
import { STEPPER_STYLES } from '@components/navigation/stepper/Stepper.css.ts'
import type { StepperItemProps } from '@components/navigation/stepper/components/stepper-item/types'
import { cn } from '@utils/cn.ts'

/**
 * Individual step slot for `Stepper`. Displays a numbered marker (check icon
 * when completed), a label, and an optional description. Renders a `<button>`
 * when `onStepChange` is present in context, otherwise a static `<span>`.
 * @param props - Item options.
 * @param props.label - Visible step title.
 * @param props.description - Optional supporting text.
 * @param props.disabled - Prevents selection of an interactive step.
 * @param props.size - Marker size; defaults to `md`.
 * @param props.children - Custom content replacing the default label.
 * @returns A step marker and content.
 * @throws When rendered outside a stepper.
 * @example
 * <Stepper.Item label="Account" />
 */
const StepperItem = memo(
    ({
        label,
        description,
        disabled,
        size = STEPPER_ITEM_SIZES.md,
        children,
    }: StepperItemProps) => {
        const context = useContext(StepperItemContext)

        if (!context) {
            throw new Error('Stepper.Item must be rendered inside Stepper.')
        }

        const { stepNumber, isCurrent, isCompleted, onStepChange } = context
        const isInteractive = Boolean(onStepChange)
        const hasCustomContent = children !== undefined
        const isTitleOnly = !hasCustomContent && !description
        const marker = isCompleted ? (
            <Icon
                icon={CheckIcon}
                size={14}
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
                    size === 'sm' && STEPPER_STYLES.contentSmall,
                )}
            >
                <Typography
                    as={'span'}
                    variant={'span'}
                    fontSize={14}
                    className={cn(STEPPER_STYLES.label, size === 'sm' && STEPPER_STYLES.labelSmall)}
                >
                    {label}
                </Typography>
                {description && (
                    <Typography
                        as={'span'}
                        variant={'span'}
                        fontSize={size === 'sm' ? 10 : 12}
                        className={cn(
                            STEPPER_STYLES.description,
                            size === 'sm' && STEPPER_STYLES.descriptionSmall,
                        )}
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
                        size === 'sm' && STEPPER_STYLES.markerSmall,
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
