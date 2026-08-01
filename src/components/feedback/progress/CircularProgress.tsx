import {
    PROGRESS_SIZE_TO_CIRCULAR_SIZE,
    PROGRESS_SIZE_TO_STROKE_WIDTH,
} from '@components/feedback/progress/constants'
import { PROGRESS_STYLES } from '@components/feedback/progress/styles/Progress.css.ts'
import type { ProgressBaseProps } from '@components/feedback/progress/types/Progress.props.ts'
import { Box } from '@components/layout/box'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const clamp = (value: number) => Math.min(100, Math.max(0, value))

const CircularProgress: FC<ProgressBaseProps> = memo(({
    value,
    color,
    size = 'sm',
    label,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    quantityLabel,
    className,
    ref,
    ...props
}) => {
    const clampedValue = clamp(value)
    const resolvedQuantityLabel =
    quantityLabel === true ? `${Math.round(clampedValue)}%` : quantityLabel
    const valueText = resolvedQuantityLabel ?? `${clampedValue}%`

    const svgSize = PROGRESS_SIZE_TO_CIRCULAR_SIZE[size]
    const strokeWidth = PROGRESS_SIZE_TO_STROKE_WIDTH[size]
    const radius = (svgSize - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference * (1 - clampedValue / 100)

    return (
        <Box
            ref={ref}
            display={'inline-flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'xs'}
            className={className}
            {...props}
        >
            <Box
                as={'div'}
                position={'relative'}
                display={'inline-flex'}
                alignItems={'center'}
                justifyContent={'center'}
            >
                <svg
                    role={'progressbar'}
                    aria-valuenow={clampedValue}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={valueText}
                    aria-label={label ?? ariaLabel}
                    aria-labelledby={ariaLabelledBy}
                    viewBox={`0 0 ${svgSize} ${svgSize}`}
                    className={cn(PROGRESS_STYLES.circular({ size }))}
                >
                    <circle
                        data-progress-track
                        cx={svgSize / 2}
                        cy={svgSize / 2}
                        r={radius}
                        className={cn(PROGRESS_STYLES.circularTrack({ size, color }))}
                    />
                    <circle
                        data-progress-indicator
                        cx={svgSize / 2}
                        cy={svgSize / 2}
                        r={radius}
                        className={cn(PROGRESS_STYLES.circularIndicator({ size, color }))}
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: dashOffset,
                        }}
                    />
                </svg>
                {resolvedQuantityLabel && (
                    <Box
                        as={'div'}
                        position={'absolute'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        style={{ inset: 0 }}
                    >
                        <Typography
                            as={'span'}
                            variant={'span'}
                            fontSize={size === 'sm' ? 'xs' : size === 'lg' ? 'lg' : 'sm'}
                            fontWeight={'semibold'}
                            color={'text'}
                        >
                            {resolvedQuantityLabel}
                        </Typography>
                    </Box>
                )}
            </Box>
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
        </Box>
    )
})

CircularProgress.displayName = 'CircularProgress'

export default CircularProgress
