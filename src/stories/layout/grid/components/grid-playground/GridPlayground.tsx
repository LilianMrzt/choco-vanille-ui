import { Grid } from '@components/layout/grid'
import type { ComponentProps, ReactElement } from 'react'
import Cell from '@stories/layout/grid/components/grid-cell/GridCell'

/**
 * Renders the Grid Playground story.
 * @internal Not part of the public package API.
 * @param args - Current component props.
 * @returns The example content.
 * @example
 * <GridPlayground />
 */
const GridPlayground = (args: ComponentProps<typeof Grid>): ReactElement => (
    <Grid {...args}>
        {Array.from({ length: 9 }, (_, i) => (
            <Cell
                key={i}
                label={`Cell ${i + 1}`}
            />
        ))}
    </Grid>
)

export default GridPlayground
