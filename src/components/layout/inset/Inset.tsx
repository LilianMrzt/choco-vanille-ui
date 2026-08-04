import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
import { Box } from '@components/layout/box'
import { INSET_STYLES } from '@components/layout/inset/styles/Inset.css.ts'
import type { InsetProps } from '@components/layout/inset/types/Inset.props.ts'
import { resolveInsetPadding } from '@components/layout/inset/utils/resolveInsetPadding.utils.ts'
import { cn } from '@utils/cn.ts'
import { memo, type CSSProperties, type FC } from 'react'

const Inset: FC<InsetProps> = memo(({
    space,
    side = 'all',
    clip = 'border-box',
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    className,
    style,
    ...props
}) => {
    const insetStyle = {
        [INSET_STYLES.insetSpaceProperty]: SPACE_VARIANTS[space],
        ...style,
    }

    return (
        <Box
            padding={resolveInsetPadding(padding, space)}
            paddingX={resolveInsetPadding(paddingX, space)}
            paddingY={resolveInsetPadding(paddingY, space)}
            paddingTop={resolveInsetPadding(paddingTop, space)}
            paddingRight={resolveInsetPadding(paddingRight, space)}
            paddingBottom={resolveInsetPadding(paddingBottom, space)}
            paddingLeft={resolveInsetPadding(paddingLeft, space)}
            className={cn(INSET_STYLES.recipe({ clip, side }), className)}
            style={insetStyle as CSSProperties}
            {...props}
        />
    )
})

Inset.displayName = 'Inset'

export default Inset
