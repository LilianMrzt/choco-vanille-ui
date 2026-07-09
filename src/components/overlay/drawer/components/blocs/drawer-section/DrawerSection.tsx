import { type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { Box } from '@components/layout/box'
import type { DrawerSectionProps } from '@components/overlay/drawer/components/blocs/drawer-section/types/DrawerSection.props.ts'

/**
 * A grouping section rendered inside a `Drawer`.
 *
 * Renders an uppercase title followed by its children — typically
 * `Drawer.NavItem`, `Drawer.ActionItem` or `Drawer.SectionItem` elements.
 */
const DrawerSection: FC<DrawerSectionProps> = ({
    as = 'section',
    title,
    titleProps,
    children,
    className,
    ...props
}) => {
    return (
        <Box
            as={as as 'div'}
            display={'flex'}
            flexDirection={'column'}
            gap={'xs'}
            className={className}
            {...props}
        >
            {title && (
                <Typography
                    variant={'small'}
                    fontSize={'xs'}
                    color={'mutedForeground'}
                    textTransform={'uppercase'}
                    fontWeight={'medium'}
                    letterSpacing={'wide'}
                    {...titleProps}
                >
                    {title}
                </Typography>
            )}
            {children}
        </Box>
    )
}

DrawerSection.displayName = 'Drawer.Section'

export default DrawerSection
