import Box from '@components/layout/box/Box.tsx'
import { SEPARATOR_STYLES } from '@components/layout/separator/styles/Separator.css.ts'
import type { SeparatorProps } from '@components/layout/separator/types/Separator.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * A thin visual divider used to separate content.
 * Renders a horizontal line by default; use `orientation="vertical"` for a vertical rule.
 */
const Separator: FC<SeparatorProps> = memo(({
    orientation = 'horizontal',
    color,
    className,
    ...props
}) => {
    return (
        <Box
            as={'div'}
            className={cn(SEPARATOR_STYLES.recipe({ orientation, color }), className)}
            {...props}
        />
    )
})

Separator.displayName = 'Separator'

export default Separator
