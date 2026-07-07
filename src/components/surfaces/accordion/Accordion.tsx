import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import AccordionContent from '@components/surfaces/accordion/components/accordion-content/AccordionContent.tsx'
import AccordionItem from '@components/surfaces/accordion/components/accordion-item/AccordionItem.tsx'
import AccordionTrigger from '@components/surfaces/accordion/components/accordion-trigger/AccordionTrigger.tsx'
import { ACCORDION_STYLES } from '@components/surfaces/accordion/Accordion.css.ts'
import type { AccordionProps } from '@components/surfaces/accordion/types/Accordion.props.ts'
import type { AccordionCompound } from '@components/surfaces/accordion/types'
import { Flex } from '@components/layout/flex'

/**
 * A styled accordion built on top of `@base-ui/react/accordion`.
 *
 * Composes `Accordion`, `Accordion.Item`, `Accordion.Trigger`, and `Accordion.Content`.
 * Supports single or multiple expanded items, disabled items, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Accordion defaultValue={['item-1']}>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
 *     <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion>
 * ```
 */
const Accordion = (({ className, width, ...props }: AccordionProps) => (
    <Flex
        flexDirection={'column'}
        alignItems={'stretch'}
        width={width ?? '100%'}
        gap={'none'}
        className={typeof className === 'function' ? undefined : className}
    >
        <BaseAccordion.Root
            className={ACCORDION_STYLES.root}
            {...props}
        />
    </Flex>
)) as AccordionCompound

Accordion.displayName = 'Accordion'
Accordion.Item = AccordionItem
Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
