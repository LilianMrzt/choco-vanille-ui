import { tooltipContentVariants } from '@components/overlay/tooltip/Tooltip.styles.ts'
import type { TooltipProps } from '@components/overlay/tooltip/types/Tooltip.props.ts'
import { mergeClassNames } from '@/utils/mergeClassNames.ts'

export const useTooltip = ({
    className,
}: Partial<Pick<TooltipProps, 'className'>>) => {
    const resolvedClassName = mergeClassNames(
        tooltipContentVariants(),
        className,
    )

    return { resolvedClassName }
}
