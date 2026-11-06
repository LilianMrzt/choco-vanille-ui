import { Typography } from '@components/foundation/typography'
import { LEGEND_STYLES } from '@components/forms/legend/Legend.css.ts'
import type { LegendProps } from '@components/forms/legend/types'
import { cn } from '@utils/cn.ts'
import { forwardRef, memo } from 'react'

/**
 * A thin wrapper around the native `<legend>` element.
 *
 * `Legend` provides the accessible name for a `Fieldset`. Screen readers
 * announce the legend text when the user enters or focuses controls inside
 * the fieldset, so the group purpose is always clear. Attributes and events
 * are forwarded to the legend; the ref targets that element.
 *
 * @param props - Legend text and typography attributes.
 * @param props.className - Additional legend class.
 * @param props.children - Accessible group label.
 * @param ref - Ref forwarded to the legend element.
 * @returns A native legend.
 * @example
 * ```tsx
 * <Fieldset>
 *   <Legend>Notification preferences</Legend>
 *   <Checkbox label="Email" />
 *   <Checkbox label="Push" />
 * </Fieldset>
 * ```
 */
const Legend = memo(forwardRef<HTMLLegendElement, LegendProps>(
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
))

Legend.displayName = 'Legend'

export default Legend
