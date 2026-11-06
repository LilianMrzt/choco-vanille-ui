import Box from '@components/layout/box/Box.tsx'
import { Typography } from '@components/foundation/typography'
import { SEPARATOR_STYLES } from '@components/layout/separator/Separator.css.ts'
import type { SeparatorProps } from '@components/layout/separator/types'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

const colorReferences = Object.fromEntries(getColorEntries(vars.color))

/**
 * A thin visual divider used to separate content.
 * Renders a horizontal line by default; use `orientation="vertical"` for a vertical rule.
 * The separator role and orientation are exposed to assistive technology.
 * Native attributes and ref target the container.
 *
 * @param props - Separator appearance and inherited layout attributes.
 * @param props.orientation - Line direction; defaults to `horizontal`.
 * @param props.color - Theme color token for the line; defaults to `border.muted`.
 * @param props.textColor - Theme color token for the label; defaults to `text.tertiary`.
 * @param props.label - Optional text displayed between line segments.
 * @param props.className - Additional separator class.
 * @returns A horizontal or vertical separator.
 * @example
 * <Separator label="or" />
 */
const Separator: FC<SeparatorProps> = memo(({
    orientation = 'horizontal',
    color,
    textColor = 'text.tertiary',
    label,
    className,
    ...props
}) => {
    const hasLabel = label !== undefined && label.length > 0

    return (
        <Box
            as={'div'}
            role={'separator'}
            className={cn(
                SEPARATOR_STYLES.recipe({ orientation, color, hasLabel }),
                className,
            )}
            {...props}
            aria-orientation={orientation}
        >
            {hasLabel ? (
                <>
                    <Box
                        as={'span'}
                        className={cn(
                            SEPARATOR_STYLES.line,
                            orientation === 'horizontal'
                                ? SEPARATOR_STYLES.horizontalLine
                                : SEPARATOR_STYLES.verticalLine,
                        )}
                    />
                    <Typography
                        variant={'label'}
                        color={colorReferences[textColor]}
                        flexShrink={0}
                    >
                        {label}
                    </Typography>
                    <Box
                        as={'span'}
                        className={cn(
                            SEPARATOR_STYLES.line,
                            orientation === 'horizontal'
                                ? SEPARATOR_STYLES.horizontalLine
                                : SEPARATOR_STYLES.verticalLine,
                        )}
                    />
                </>
            ) : null}
        </Box>
    )
})

Separator.displayName = 'Separator'

export default Separator
