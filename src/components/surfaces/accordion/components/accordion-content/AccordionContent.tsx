import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import { ACCORDION_CONTENT_STYLES } from '@components/surfaces/accordion/components/accordion-content/AccordionContent.css.ts'
import type { AccordionContentProps } from '@components/surfaces/accordion/components/accordion-content/types/AccordionContent.props.ts'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'

/**
 * Collapsible panel with the accordion item contents.
 */
const AccordionContent = ({
    className,
    padding = 'md',
    keepMounted = true,
    children,
    ...props
}: AccordionContentProps) => (
    <BaseAccordion.Panel
        keepMounted={keepMounted}
        className={cn(ACCORDION_CONTENT_STYLES.root, className)}
        style={{ paddingBottom: vars.space[padding] }}
        {...props}
    >
        <div className={ACCORDION_CONTENT_STYLES.inner}>{children}</div>
    </BaseAccordion.Panel>
)

AccordionContent.displayName = 'Accordion.Content'

export default AccordionContent
