import { vars } from '@theme/styles/contract/contract.css.ts'
import { memo, type FC, useId } from 'react'

import { Typography } from '@components/foundation/typography'
import { Box } from '@components/layout/box'
import type { DrawerSectionProps } from '@components/overlay/drawer/components/blocs/drawer-section/types/DrawerSection.props.ts'

/**
 * A grouping section rendered inside a `Drawer`.
 *
 * Renders an uppercase title followed by its children — typically
 * `Drawer.NavItem`, `Drawer.ActionItem` or `Drawer.SectionItem` elements.
 */
const DrawerSection: FC<DrawerSectionProps> = memo(({
    as = 'section',
    title,
    titleProps,
    children,
    className,
    ...props
}) => {
    const generatedTitleId = useId()
    const resolvedTitleId = titleProps?.id ?? generatedTitleId

    return (
        <Box
            as={as as 'div'}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
            width={'100%'}
            className={className}
            aria-labelledby={title ? resolvedTitleId : undefined}
            {...props}
        >
            {title && (
                <Typography
                    variant={'small'}
                    fontSize={12}
                    color={vars.color.surface.mutedForeground}
                    textTransform={'uppercase'}
                    fontWeight={'medium'}
                    letterSpacing={'0.025em'}
                    maxLines={1}
                    id={resolvedTitleId}
                    {...titleProps}
                >
                    {title}
                </Typography>
            )}
            <Box
                paddingTop={4}
            >
                {children}
            </Box>
        </Box>
    )
})

DrawerSection.displayName = 'Drawer.Section'

export default DrawerSection
