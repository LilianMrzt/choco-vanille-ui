import { GRID_STYLES } from '@components/layout/grid/Grid.css.ts'
import type { GridProps } from '@components/layout/grid/types'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

import Box from '@components/layout/box/Box.tsx'

/**
 * CSS grid container built on `Box`. Supports token-based `columns`,
 * `gridAutoRows`, `gridTemplateRows`, `gridAutoFlow`, alignment axes,
 * and `gap`. Accepts all `Box` props for additional layout customization.
 * Native attributes and ref target the element selected by `as`.
 *
 * @param props - Grid and inherited layout attributes.
 * @param props.columns - Column count or `none`.
 * @param props.gridAutoRows - Automatic row sizing preset.
 * @param props.gridTemplateRows - Row template preset.
 * @param props.gridAutoFlow - Auto-placement direction.
 * @param props.alignItems - Block-axis item alignment.
 * @param props.justifyItems - Inline-axis item alignment.
 * @param props.alignContent - Block-axis track alignment.
 * @param props.justifyContent - Inline-axis track alignment.
 * @param props.gap - Spacing token between tracks; defaults to `12`.
 * @param props.className - Additional container class.
 * @returns A grid container.
 * @example
 * <Grid columns={2} gap={12}><span>One</span><span>Two</span></Grid>
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
