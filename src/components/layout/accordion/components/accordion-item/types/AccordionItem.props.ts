import type { Accordion } from '@base-ui/react/accordion'

export type AccordionItemProps = Accordion.Item.Props & {
    /** Shows a bottom border on the item. @default true */
    bordered?: boolean;
}
