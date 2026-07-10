import { memo, type FC } from 'react'

import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import { ACCORDION_ITEM_STYLES } from '@components/surfaces/accordion/components/accordion-item/styles/AccordionItem.css.ts'
import type { AccordionItemProps } from '@components/surfaces/accordion/components/accordion-item/types/AccordionItem.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Groups an accordion header with its corresponding panel.
 */
const AccordionItem: FC<AccordionItemProps> = memo(({ className, bordered = true, ...props }) => (
    <BaseAccordion.Item
        className={cn(ACCORDION_ITEM_STYLES.recipe({ bordered }), className)}
        {...props}
    />
))

AccordionItem.displayName = 'Accordion.Item'

export default AccordionItem
