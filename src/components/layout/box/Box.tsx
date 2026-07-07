import { BOX_STYLES } from '@components/layout/box/styles/Box.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Box: FC<BoxProps> = ({
    as: Element = 'div',
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
    alignSelf,
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
    backgroundColor,
    className,
    style,
    ref,
    ...props
}) => {
    return (
        <Element
            ref={ref}
            className={cn(
                BOX_STYLES.recipe({
                    display,
                    overflow,
                    overflowX,
                    overflowY,
                    position,
                    flex,
                    alignSelf,
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
                    backgroundColor,
                }),
                className,
            )}
            style={{
                width,
                minWidth,
                maxWidth,
                height,
                minHeight,
                maxHeight,
                ...style,
            }}
            {...props}
        />
    )
}

Box.displayName = 'Box'

export default Box
