import { GRID_STYLES } from '@components/layout/grid/styles/Grid.css.ts'
import type { GridProps } from '@components/layout/grid/types/Grid.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

/**
 * CSS grid container built on `Box`. Supports token-based `columns`,
 * `gridAutoRows`, `gridTemplateRows`, `gridAutoFlow`, alignment axes,
 * and `gap`. Accepts all `Box` props for additional layout customization.
 */
const Grid: FC<GridProps> = memo(({
    columns,
    gridAutoRows,
    gridTemplateRows,
    gridAutoFlow,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    gap = 12,
    className,
    ...props
}) => {
    return (
        <Box
            gap={gap}
            className={cn(
                GRID_STYLES.recipe({
                    columns,
                    gridAutoRows,
                    gridTemplateRows,
                    gridAutoFlow,
                    alignItems,
                    justifyItems,
                    alignContent,
                    justifyContent,
                }),
                className,
            )}
            {...props}
        />
    )
})

Grid.displayName = 'Grid'

export default Grid
