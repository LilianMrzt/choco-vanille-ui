import { vars } from '@theme/styles/contract/contract.css.ts'
import { PROGRESS_STYLES } from '@components/feedback/progress/styles/Progress.css.ts'
import type { ProgressBaseProps, ProgressRenderProps } from '@components/feedback/progress/types/Progress.props.ts'
import { Box } from '@components/layout/box'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const clamp = (value: number) => Math.min(100, Math.max(0, value))

/**
 * Horizontal `role="progressbar"` with label, optional quantity display,
 * design-token `size` (xs|sm|md|lg|xl), `color`, and `borderRadius`.
 * Requires an accessible name via `label`, `aria-label`, or
 * `aria-labelledby`.
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
