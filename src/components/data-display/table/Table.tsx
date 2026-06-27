import type { FC } from 'react'

import {
    tableRecipe,
    tableWrapperClass,
    tableStripedClass,
    tableBorderedClass,
    tableFixedClass,
} from '@components/data-display/table/Table.css.ts'
import type { TableProps } from '@components/data-display/table/types/Table.props.ts'
import { cn } from '@utils/cn.ts'

const Table: FC<TableProps> = ({ size, striped, bordered, fixed, className, ref, ...props }) => (
    <div
        className={tableWrapperClass}
        // Scrollable overflow containers must be keyboard-reachable so users
        // can scroll them without a mouse (WCAG 2.1 SC 2.1.1).
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
    >
        <table
            ref={ref}
            className={cn(
                tableRecipe({ size }),
                striped && tableStripedClass,
                bordered && tableBorderedClass,
                fixed && tableFixedClass,
                className,
            )}
            {...props}
        />
    </div>
)

Table.displayName = 'Table'

export default Table
