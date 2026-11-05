import type { ComponentPropsWithRef } from 'react'

import type { TableRowIntent } from '@components/data-display/table/types'

/** Native tr attributes and row presentation; the ref targets the row. */
export type TableRowProps = Readonly<ComponentPropsWithRef<'tr'> & {
    /** Hover background. Defaults to false; selectable also enables it. */
    hoverable?: boolean
    /** Focus and Enter/Space activation through onClick. Defaults to false. */
    selectable?: boolean
    /** Consumer-owned selection state and highlight. Defaults to false. */
    selected?: boolean
    /** Semantic background intent. Omitted by default; also convey meaning in text. */
    intent?: TableRowIntent
}>
