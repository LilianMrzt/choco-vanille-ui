import type { FC } from 'react'

import type AccordionContent from '@components/surfaces/accordion/components/accordion-content/AccordionContent.tsx'
import type AccordionItem from '@components/surfaces/accordion/components/accordion-item/AccordionItem.tsx'
import type AccordionTrigger from '@components/surfaces/accordion/components/accordion-trigger/AccordionTrigger.tsx'
import type { AccordionProps } from '@components/surfaces/accordion/types/Accordion.props.ts'

export type AccordionCompound = FC<AccordionProps> & {
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
};

export type { AccordionProps } from '@components/surfaces/accordion/types/Accordion.props.ts'
