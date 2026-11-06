import { BOX_STYLES } from '@components/layout/box/Box.css.ts'
import type { BoxProps } from '@components/layout/box/types'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * Polymorphic layout primitive. Maps design-token props (padding, margin,
 * gap, border-radius, box-shadow) to Vanilla Extract atomic classes
 * and passes layout props (display, flex, position, overflow, text-align) as inline
 * styles. Color props accept CSS values, including `vars.color` and arbitrary
 * custom property references, without token-name lookup. Consumer `style` wins
 * over props. Omit color props when classes or interaction states own colors;
 * no inline color defaults are applied. Use `as` to change the rendered element;
 * native attributes, events and ref target that element.
 *
 * @param props - Native attributes, element selection and layout styling.
 * @param props.as - Element or component to render; defaults to `div`.
 * @param props.borderRadius - Radius token.
 * @param props.padding - Padding token for all sides.
 * @param props.paddingX - Padding token for the inline axis.
 * @param props.paddingY - Padding token for the block axis.
 * @param props.paddingTop - Top padding token.
 * @param props.paddingRight - Right padding token.
 * @param props.paddingBottom - Bottom padding token.
 * @param props.paddingLeft - Left padding token.
 * @param props.margin - Margin token or `auto` for all sides.
 * @param props.marginX - Margin token or `auto` on the inline axis.
 * @param props.marginY - Margin token or `auto` on the block axis.
 * @param props.marginTop - Top margin token or `auto`.
 * @param props.marginRight - Right margin token or `auto`.
 * @param props.marginBottom - Bottom margin token or `auto`.
 * @param props.marginLeft - Left margin token or `auto`.
 * @param props.gap - Spacing token between children.
 * @param props.columnGap - Column gap token.
 * @param props.rowGap - Row gap token.
 * @param props.color - CSS text color.
 * @param props.borderColor - CSS border color.
 * @param props.backgroundColor - CSS background color.
 * @param props.boxShadow - Shadow token.
 * @param props.display - CSS display value.
 * @param props.width - CSS width.
 * @param props.minWidth - CSS minimum width.
 * @param props.maxWidth - CSS maximum width.
 * @param props.height - CSS height.
 * @param props.minHeight - CSS minimum height.
 * @param props.maxHeight - CSS maximum height.
 * @param props.overflow - CSS overflow value.
 * @param props.overflowX - CSS horizontal overflow value.
 * @param props.overflowY - CSS vertical overflow value.
 * @param props.position - CSS positioning mode.
 * @param props.flex - CSS flex shorthand.
 * @param props.flexDirection - CSS flex direction.
 * @param props.flexWrap - CSS flex wrapping.
 * @param props.alignSelf - CSS self-alignment.
 * @param props.alignItems - CSS item alignment.
 * @param props.alignContent - CSS content alignment.
 * @param props.justifyContent - CSS content justification.
 * @param props.textAlign - CSS text alignment.
 * @param props.borderWidth - CSS border width.
 * @param props.borderTopWidth - CSS top border width.
 * @param props.borderRightWidth - CSS right border width.
 * @param props.borderBottomWidth - CSS bottom border width.
 * @param props.borderLeftWidth - CSS left border width.
 * @param props.borderStyle - CSS border style.
 * @param props.className - Additional element class.
 * @param props.style - Inline style overrides.
 * @param props.ref - Ref passed to the rendered element.
 * @returns The selected layout element.
 * @example
 * <Box as="section" padding={16}>Content</Box>
 */
const Box: FC<BoxProps> = memo(({
    as: Element = 'div',
    borderRadius,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    gap,
    columnGap,
    rowGap,
    color,
    borderColor,
    backgroundColor,
    boxShadow,
    display,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    overflow,
    overflowX,
    overflowY,
    position,
    flex,
    flexDirection,
    flexWrap,
    alignSelf,
    alignItems,
    alignContent,
    justifyContent,
    textAlign,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderStyle,
    className,
    style,
    ref,
    ...props
}) => {
    const recipeClassName = useMemo(
        () =>
            BOX_STYLES.recipe({
                borderRadius,
                padding,
                paddingX,
                paddingY,
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
                margin,
                marginX,
                marginY,
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
                gap,
                columnGap,
                rowGap,
                boxShadow,
            }),
        [
            borderRadius,
            padding,
            paddingX,
            paddingY,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            margin,
            marginX,
            marginY,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            gap,
            columnGap,
            rowGap,
            boxShadow,
        ],
    )

    return (
        <Element
            ref={ref}
            className={cn(recipeClassName, className)}
            style={{
                color,
                borderColor,
                backgroundColor,
                display,
                width,
                minWidth,
                maxWidth,
                height,
                minHeight,
                maxHeight,
                overflow,
                overflowX,
                overflowY,
                position,
                flex,
                flexDirection,
                flexWrap,
                alignSelf,
                alignItems,
                alignContent,
                justifyContent,
                textAlign,
                borderWidth,
                borderTopWidth,
                borderRightWidth,
                borderBottomWidth,
                borderLeftWidth,
                borderStyle,
                ...style,
            }}
            {...props}
        />
    )
})

Box.displayName = 'Box'

export default Box
