import type { FC, KeyboardEvent } from 'react'

import { TABLE_ROW_STYLES } from '@components/data-display/table/components/table-row/TableRow.css.ts'
import type { TableRowProps } from '@components/data-display/table/components/table-row/types/index.ts'
import { cn } from '@utils/cn.ts'

/**
 * Groups header or data cells through `Table.Row`. Presentation flags default
 * to false; intent is omitted by default. Selectable rows are focusable and
 * expose aria-selected (false unless selected); onClick must implement the
 * consumer-owned selection. Enter/Space activate onClick unless the consumer
 * onKeyDown prevents default. Selected styling also works without selectable.
 * Avoid interactive descendants that would also activate the row, and convey
 * intent with content, not color alone. Native attributes, events, className,
 * style, and ref target the tr; native ARIA/tabIndex overrides are preserved.
 *
 * @param props - Native row attributes and presentation options.
 * @param props.hoverable - Enables hover styling; defaults to false.
 * @param props.selectable - Enables focus, selection semantics and Enter/Space activation; defaults to false.
 * @param props.selected - Consumer-owned selection state; defaults to false.
 * @param props.intent - Optional semantic row color; convey its meaning in the row content too.
 * @param props.className - Consumer class merged with the row classes.
 * @param props.ref - Ref forwarded to the tr element.
 * @param props.onKeyDown - Native handler called before keyboard activation; preventDefault cancels activation.
 * @param props.children - Header or data cells composing the row.
 * @returns A semantic table row.
 * @example
 * <Table.Row selectable selected={isSelected} onClick={handleSelect}>
 *     <Table.Cell>INV-001</Table.Cell>
 * </Table.Row>
 */
const TableRow: FC<TableRowProps> = ({
    hoverable,
    selectable,
    selected,
    intent,
    className,
    ref,
    onKeyDown,
    ...props
}) => {
    /**
     * Forwards the native key event and activates an uncancelled selectable row.
     * @param event - Row keyboard event; Enter and Space activate onClick.
     * @returns Nothing.
     * @example
     * <tr onKeyDown={handleKeyDown}><td>Invoice</td></tr>
     */
    const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>): void => {
        onKeyDown?.(event)

        if (selectable && !event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault()
            event.currentTarget.click()
        }
    }

    return (
        <tr
            ref={ref}
            data-intent={intent}
            aria-selected={selectable ? selected ?? false : undefined}
            tabIndex={selectable ? 0 : undefined}
            onKeyDown={selectable || onKeyDown ? handleKeyDown : undefined}
            className={cn(TABLE_ROW_STYLES.recipe({ hoverable, selectable, selected, intent }), className)}
            {...props}
        />
    )
}

TableRow.displayName = 'Table.Row'

export default TableRow
