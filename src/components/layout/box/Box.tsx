import { BOX_STYLES } from '@components/layout/box/Box.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Box: FC<BoxProps> = ({
    as: Element = 'div',
    display,
    width,
    height,
    overflow,
    overflowX,
    overflowY,
    position,
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
    ref,
    ...props
}) => {
    return (
        <Element
            ref={ref}
            className={cn(
                BOX_STYLES.recipe({
                    display,
                    width,
                    height,
                    overflow,
                    overflowX,
                    overflowY,
                    position,
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
            {...props}
        />
    )
}

Box.displayName = 'Box'

export default Box
