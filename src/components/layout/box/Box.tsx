import { BOX_STYLES } from '@components/layout/box/Box.css.ts'
import type { BoxProps } from '@components/layout/box/types/Box.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Box: FC<BoxProps> = ({
    as: Element = 'div',
    display,
    w,
    h,
    overflow,
    overflowX,
    overflowY,
    position,
    rounded,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    gap,
    gapX,
    gapY,
    bg,
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
                    w,
                    h,
                    overflow,
                    overflowX,
                    overflowY,
                    position,
                    rounded,
                    p,
                    px,
                    py,
                    pt,
                    pr,
                    pb,
                    pl,
                    m,
                    mx,
                    my,
                    mt,
                    mr,
                    mb,
                    ml,
                    gap,
                    gapX,
                    gapY,
                    bg,
                }),
                className,
            )}
            {...props}
        />
    )
}

Box.displayName = 'Box'

export default Box
