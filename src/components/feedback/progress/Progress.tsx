import { vars } from '@theme/styles/contract/contract.css.ts'
import { PROGRESS_STYLES } from '@components/feedback/progress/Progress.css.ts'
import type { ProgressBaseProps, ProgressRenderProps } from '@components/feedback/progress/types'
import { clamp } from '@components/feedback/progress/utils/clamp.utils.ts'
import { Box } from '@components/layout/box'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Horizontal `role="progressbar"` with label, optional quantity display,
 * design-token `size` (xs|sm|md|lg|xl), `color`, and `borderRadius`.
 * Requires an accessible name via `label`, `aria-label`, or
 * `aria-labelledby`.
 * @param props - Progress value, accessible name and outer box props.
 * @param props.value - Progress percentage, clamped to 0–100.
 * @param props.color - Semantic color, defaulting to `primary`.
 * @param props.size - Track height, defaulting to `sm`.
 * @param props.borderRadius - Track radius, defaulting to `6`.
 * @param props.label - Visible label and accessible name.
 * @param props.quantityLabel - Percentage or custom quantity.
 * @param props.width - Outer width, defaulting to `100%`.
 * @param props.ref - Ref to the outer element.
 * @returns A horizontal progress indicator.
 * @example
 * <Progress value={50} aria-label="Loading" />
 */
const Progress: FC<ProgressBaseProps> = memo<ProgressRenderProps>(({
    value,
    color,
    size = 'sm',
    borderRadius = 6,
    label,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    quantityLabel,
    width = '100%',
    className,
    ref,
    ...props
}) => {
    const clampedValue = clamp(value)
    const resolvedQuantityLabel =
    quantityLabel === true ? `${Math.round(clampedValue)}%` : quantityLabel
    const valueText = resolvedQuantityLabel ?? `${clampedValue}%`

    return (
        <Box
            ref={ref}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
            width={width}
            className={className}
            {...props}
        >
            {(label || resolvedQuantityLabel) && (
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={8}
                >
                    {label && (
                        <Typography
                            as={'span'}
                            variant={'span'}
                            fontSize={14}
                            color={vars.color.text.secondary}
                        >
                            {label}
                        </Typography>
                    )}
                    {resolvedQuantityLabel && (
                        <Typography
                            as={'span'}
                            variant={'span'}
                            fontSize={14}
                            fontWeight={'medium'}
                            color={vars.color.text.secondary}
                        >
                            {resolvedQuantityLabel}
                        </Typography>
                    )}
                </Box>
            )}
            <Box
                as={'div'}
                role={'progressbar'}
                aria-valuenow={clampedValue}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={valueText}
                aria-label={label ?? ariaLabel}
                aria-labelledby={ariaLabelledBy}
                className={cn(PROGRESS_STYLES.recipe({ size, borderRadius, color }))}
            >
                <Box
                    as={'div'}
                    data-progress-fill
                    width={`${clampedValue}%`}
                    className={cn(PROGRESS_STYLES.fill({ borderRadius, color }))}
                />
            </Box>
        </Box>
    )
})

Progress.displayName = 'Progress'

export default Progress
