import { cloneElement, memo, type FC, useId } from 'react'

import DrawerSectionTitle from '@components/overlay/drawer/components/blocs/drawer-section-title/DrawerSectionTitle'
import { Box } from '@components/layout/box'
import type { DrawerSectionProps } from '@components/overlay/drawer/components/blocs/drawer-section/types'
import { splitDrawerSectionChildren } from '@components/overlay/drawer/components/blocs/drawer-section/utils/split-drawer-section-children/splitDrawerSectionChildren.utils'

/**
 * A grouping section rendered inside a `Drawer`.
 *
 * Renders a title preserving its supplied casing followed by children, typically
 * `Drawer.NavItem`, `Drawer.ActionItem` or `Drawer.Collapsible` elements.
 * Titles use a 1.5 line height. Override typography through `titleProps`,
 * including `textTransform` to request uppercase explicitly.
 * Alternatively compose one direct Drawer.SectionTitle child, optionally within
 * fragments. Its id automatically labels the section, including during SSR.
 * Do not combine that slot with title or titleProps. Native attributes and ref
 * target the section; explicit aria-labelledby overrides the generated relation.
 * @param props - Group content and layout attributes.
 * @param props.as - Container element; defaults to section.
 * @param props.title - Optional visible group title.
 * @param props.titleProps - Typography overrides, including casing and label ID.
 * @param props.children - Grouped content.
 * @param props.className - Additional container class.
 * @returns The labelled content group.
 * @throws When title sources are combined or more than one title slot is supplied.
 * @example
 * <Drawer.Section title="Account" titleProps={{ textTransform: 'uppercase' }}>...</Drawer.Section>
 */
const DrawerSection: FC<DrawerSectionProps> = memo(
    ({ as = 'section', title, titleProps, children, className, ...props }) => {
        const generatedTitleId = useId()
        const { title: titleSlot, content } = splitDrawerSectionChildren(children)
        if (titleSlot !== undefined && (title !== undefined || titleProps !== undefined)) {
            throw new Error('Drawer.Section: use Drawer.SectionTitle or title/titleProps, not both.')
        }
        const hasTitle = titleSlot !== undefined || Boolean(title)
        const resolvedTitleId = titleSlot?.props.id ?? titleProps?.id ?? generatedTitleId

        return (
            <Box
                as={as}
                display={'flex'}
                flexDirection={'column'}
                gap={4}
                width={'100%'}
                className={className}
                aria-labelledby={hasTitle ? resolvedTitleId : undefined}
                {...props}
            >
                {titleSlot !== undefined ? cloneElement(titleSlot, { id: resolvedTitleId }) : title && (
                    <DrawerSectionTitle
                        id={resolvedTitleId}
                        {...titleProps}
                    >
                        {title}
                    </DrawerSectionTitle>
                )}
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    gap={0}
                >
                    {content}
                </Box>
            </Box>
        )
    },
)

DrawerSection.displayName = 'Drawer.Section'

export default DrawerSection
