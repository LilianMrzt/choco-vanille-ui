import { GRID_STYLES } from '@components/layout/grid/styles/Grid.css.ts'
import type { GridProps } from '@components/layout/grid/types/Grid.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

const Grid: FC<GridProps> = memo(({
    columns,
    gridAutoRows,
    gridTemplateRows,
    gridAutoFlow,
    alignItems,
    justifyItems,
    alignContent,
    justifyContent,
    gap = 'md',
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
