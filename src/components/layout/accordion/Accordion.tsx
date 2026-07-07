import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import AccordionContent from '@components/layout/accordion/components/accordion-content/AccordionContent.tsx'
import AccordionItem from '@components/layout/accordion/components/accordion-item/AccordionItem.tsx'
import AccordionTrigger from '@components/layout/accordion/components/accordion-trigger/AccordionTrigger.tsx'
import { ACCORDION_STYLES } from '@components/layout/accordion/Accordion.css.ts'
import type { AccordionCompound } from '@components/layout/accordion/types'
import { cn } from '@utils/cn.ts'

/**
 * A styled accordion built on top of `@base-ui/react/accordion`.
 *
 * Composes `Accordion`, `Accordion.Item`, `Accordion.Trigger`, and `Accordion.Content`.
 * Supports single or multiple expanded items, disabled items, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Accordion type="single" defaultValue="item-1" collapsible>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
 *     <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
const Accordion = (({ className, ...props }) => (
    <BaseAccordion.Root
        className={cn(ACCORDION_STYLES.root, className)}
        {...props}
    />
)) as AccordionCompound

Accordion.displayName = 'Accordion'
Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion