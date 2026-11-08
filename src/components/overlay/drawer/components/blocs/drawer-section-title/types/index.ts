import type { ElementType } from 'react'
import type { TypographyProps } from '@components/foundation/typography'

/** Typography, native attributes and ref for `Drawer.SectionTitle`; defaults to small. */
export type DrawerSectionTitleProps<Element extends ElementType = 'small'> =
    TypographyProps<Element>
