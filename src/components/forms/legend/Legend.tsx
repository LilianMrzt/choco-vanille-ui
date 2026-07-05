import { Typography } from '@components/foundation/typography'
import { LEGEND_STYLES } from '@components/forms/legend/Legend.css.ts'
import type { LegendProps } from '@components/forms/legend/types/Legend.props.ts'
import { cn } from '@utils/cn.ts'
import { forwardRef } from 'react'

/**
 * A thin wrapper around the native `<legend>` element.
 *
 * `Legend` provides the accessible name for a `Fieldset`. Screen readers
 * announce the legend text when the user enters or focuses controls inside
 * the fieldset, so the group purpose is always clear.
 *
 * @example
 * ```tsx
 * <Fieldset>
 *   <Legend>Notification preferences</Legend>
 *   <Checkbox label="Email" />
 *   <Checkbox label="Push" />
 * </Fieldset>
 * ```
 */
const Legend = forwardRef<HTMLLegendElement, LegendProps>(
    ({ className, children, ...props }, ref) => (
        <Typography
            ref={ref}
            as={'legend'}
            variant={'label'}
            className={cn(LEGEND_STYLES.root, className)}
            {...props}
        >
            {children}
        </Typography>
    ),
)

Legend.displayName = 'Legend'

export default Legend
