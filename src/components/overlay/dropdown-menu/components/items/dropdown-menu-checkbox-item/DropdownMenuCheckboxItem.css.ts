/**
 * The checkbox indicator used inside `DropdownMenuCheckboxItem`.
 *
 * Re-exports `checkboxRootClass` from the `Checkbox` form component so that:
 *  - The visual style (border, radius, colours, transitions) is defined exactly
 *    once in the forms layer.
 *  - The `globalStyle` that sizes the SVG icon is automatically inherited —
 *    no duplication needed here.
 *  - Both the standalone `<Checkbox>` and the menu indicator share the same
 *    CSS class, keeping visuals perfectly consistent.
 *
 * State behaviour in this context relies on the *ancestor* selectors
 * (`[data-state="checked"] &`, `[data-highlighted] &`, `[data-disabled] &`)
 * that are already part of `checkboxRootClass`.
 */
export { checkboxRootClass as dropdownMenuCheckboxBoxClass } from '@components/forms/checkbox/Checkbox.css.ts'
