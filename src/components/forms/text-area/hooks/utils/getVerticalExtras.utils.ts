/**
 * Sums the vertical padding and border widths of an element, i.e. the space
 * added around the content box that must be accounted for when computing the
 * total height from a target number of text rows.
 */
export const getVerticalExtras = (computed: CSSStyleDeclaration): number => {
    const paddingTop = parseFloat(computed.paddingTop)
    const paddingBottom = parseFloat(computed.paddingBottom)
    const borderTop = parseFloat(computed.borderTopWidth)
    const borderBottom = parseFloat(computed.borderBottomWidth)
    return paddingTop + paddingBottom + borderTop + borderBottom
}
