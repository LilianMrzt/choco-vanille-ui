import type { ElementType, ReactElement } from 'react'

import { Typography } from '@components/foundation/typography'
import type { DrawerSectionTitleProps } from '@components/overlay/drawer/components/blocs/drawer-section-title/types'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Composable drawer section title with neutral 12px medium text and 1.5 line height.
 * Preserves casing and truncates to one line by default. Typography props override
 * defaults; native attributes and ref target the selected element, small by default.
 * Place directly inside Drawer.Section, optionally within fragments, for automatic
 * labelling. A custom id is preserved. Can also render as standalone typography.
 * @template Element - Element selected by as.
 * @param props - Title content, typography, layout and native attributes.
 * @returns The title element.
 * @example
 * <Drawer.SectionTitle as="h2" textTransform="uppercase">Navigation</Drawer.SectionTitle>
 */
const DrawerSectionTitle = <Element extends ElementType = 'small'>(
    props: DrawerSectionTitleProps<Element>,
): ReactElement => {
    return (
        <Typography
            as={props.as ?? 'small'}
            variant={'small'}
            fontSize={12}
            lineHeight={1.5}
            color={vars.color.surface.mutedForeground}
            fontWeight={'medium'}
            letterSpacing={'0.025em'}
            maxLines={1}
            {...props}
        />
    )
}

export default DrawerSectionTitle
