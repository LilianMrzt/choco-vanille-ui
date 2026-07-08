import { GRID_STYLES } from '@components/layout/grid/styles/Grid.css.ts'
import type { GridProps } from '@components/layout/grid/types/Grid.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

const Grid: FC<GridProps> = ({
    columns,
    gap = 'md',
    className,
    ...props
}) => {
    return (
        <Box
            gap={gap}
            gridTemplateColumns={columns}
            className={cn(GRID_STYLES.recipe({}), className)}
            {...props}
        />
    )
}

Grid.displayName = 'Grid'

export default Grid
