/**
 * The radio indicator used inside `DropdownMenuRadioItem`.
 *
 * Re-exports `radioItemRootClass` from the `RadioItem` form component so that:
 *  - The visual style (border, radius, colours, transitions) is defined exactly
 *    once in the forms layer.
 *  - The `globalStyle` that sizes the SVG dot is automatically inherited —
 *    no duplication needed here.
 *  - Both the standalone `<RadioItem>` and the menu indicator share the same
 *    CSS class, keeping visuals perfectly consistent.
 *
 * State behaviour in this context relies on the *ancestor* selectors
 * (`[data-state="checked"] &`, `[data-highlighted] &`, `[data-disabled] &`)
 * that are already part of `radioItemRootClass`.
 */
export { radioItemRootClass as dropdownMenuRadioCircleClass } from '@components/forms/radio-group/components/radio-item/RadioItem.css.ts'
