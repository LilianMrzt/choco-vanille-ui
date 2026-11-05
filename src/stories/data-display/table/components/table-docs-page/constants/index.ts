export const ACCESSIBILITY_DESCRIPTION = `
## Accessibility

Keep the native table hierarchy and supply meaningful labels. The scroll
container is keyboard-focusable; native table, section, row and cell refs
remain available.

| Prop / Attribute | Required | Type | Notes |
| --- | --- | --- | --- |
| \`Table.Caption\` / \`aria-label\` / \`aria-labelledby\` | Yes, one naming mechanism | ReactNode / string | Provide a descriptive accessible table name. |
| \`scope\` on \`Table.Head\` | Context-dependent | Native th scope | Defaults to col; use row for row labels. |
| \`sortDirection\` on \`Table.Head\` | When sorting | asc / desc / none | Reflect the current consumer-owned sort state on the sorted column. |
| \`onClick\` on interactive Head / Row | When interactive | Native mouse handler | Implements consumer-owned sort or selection; Enter/Space also activate it. Avoid nested interactive controls in selectable rows. |
| \`onKeyDown\` on interactive Head / Row | No | Native keyboard handler | Consumer preventDefault cancels keyboard activation. |
| Row intent / Cell truncate | No | Presentation props | Convey intent in text and keep complete truncated content accessible. |

## Compound props

| Slot | Public props and defaults | Native forwarding / exclusions |
| --- | --- | --- |
| Header | Native section props only | \`thead\` ref, children, events, ARIA, className and style; structural children are fixed in this demo. |
| Body | Native section props only | \`tbody\` ref and attributes; rows are fixed demo data. |
| Footer | Native section props only | \`tfoot\` ref and attributes; the demo uses a total row. |
| Caption | Native caption props only | \`caption\` ref and attributes; text is editable in Controls. |
| ColGroup | Native column-group props including \`span\` | \`colgroup\` ref and attributes; span is excluded because this demo uses explicit Col children. |
| Col | \`width\`, \`minWidth\`, \`maxWidth\`: omitted | \`col\` ref, native span and attributes; CSS constraints are browser-dependent and style wins. Span is excluded because each displayed column has its own Col. |
| Head | \`align="left"\`, \`sortable=false\`, \`sortDirection\` omitted | \`th\` ref, scope (defaults to col), abbr, colSpan/rowSpan, tabIndex and native events. Scope/spans are fixed for this two-column example. Native aria-sort is used when sortDirection is omitted; an explicit direction wins. |
| Cell | \`align="left"\`, \`numeric=false\`, \`truncate=false\` | \`td\` ref, native spans, headers and events. Numeric overrides align. The total uses colSpan=1; merged cells are not edited in this demo. |
| Row | \`hoverable=false\`, \`selectable=false\`, \`selected=false\`, intent omitted | \`tr\` ref, native ARIA/tabIndex and events. Selected can style a non-selectable row; aria-selected defaults to false only when selectable. |

All slot refs, className, style, React children and native event functions are
supported but excluded from Controls because they are non-serializable or
require custom composition. The native attributes above remain available in
consumer code; Controls expose the meaningful presentation and interaction
axes of this example. Demo selection/sort controls are not package props.
`
