import { PROGRESS_STYLES } from '@components/feedback/progress/styles/Progress.css.ts'
import type { ProgressBaseProps, ProgressRenderProps } from '@components/feedback/progress/types/Progress.props.ts'
import { Box } from '@components/layout/box'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const clamp = (value: number) => Math.min(100, Math.max(0, value))

const Progress: FC<ProgressBaseProps> = memo<ProgressRenderProps>(({
    value,
    color,
    size = 'sm',
    borderRadius = 'sm',
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
            gap={'xs'}
            width={width}
            className={className}
            {...props}
        >
            {(label || resolvedQuantityLabel) && (
                <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    gap={'sm'}
                >
                    {label && (
                        <Typography
                            as={'span'}
                            variant={'span'}
                            fontSize={'sm'}
                            color={'textSecondary'}
                        >
                            {label}
                        </Typography>
                    )}
                    {resolvedQuantityLabel && (
                        <Typography
                            as={'span'}
                            variant={'span'}
                            fontSize={'sm'}
                            fontWeight={'medium'}
                            color={'textSecondary'}
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
