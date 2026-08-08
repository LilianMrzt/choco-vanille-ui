import { BOX_STYLES } from '@components/layout/box/styles/Box.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, useMemo, type FC } from 'react'

/**
 * Polymorphic layout primitive. Maps design-token props (padding, margin,
 * gap, border, background, box-shadow) to Vanilla Extract atomic classes
 * and passes layout props (display, flex, position, overflow) as inline
 * styles. Use the `as` prop to change the rendered element.
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
                borderColor,
                backgroundColor,
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
            borderColor,
            backgroundColor,
            boxShadow,
        ],
    )

    return (
        <Element
            ref={ref}
            className={cn(recipeClassName, className)}
            style={{
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
