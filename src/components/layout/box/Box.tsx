import { BOX_STYLES } from '@components/layout/box/styles/Box.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * Polymorphic layout primitive. Maps design-token props (padding, margin,
 * gap, border-radius, box-shadow) to Vanilla Extract atomic classes
 * and passes layout props (display, flex, position, overflow, text-align) as inline
 * styles. Color props accept CSS values, including `vars.color` and arbitrary
 * custom property references, without token-name lookup. Consumer `style` wins
 * over props. Omit color props when classes or interaction states own colors;
 * no inline color defaults are applied. Use `as` to change the rendered element.
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
