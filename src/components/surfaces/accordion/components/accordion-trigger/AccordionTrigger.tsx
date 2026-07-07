import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import {
    ACCORDION_TRIGGER_STYLES,
    accordionTriggerChevron,
} from '@components/surfaces/accordion/components/accordion-trigger/AccordionTrigger.css.ts'
import type { AccordionTriggerProps } from '@components/surfaces/accordion/components/accordion-trigger/types/AccordionTrigger.props.ts'
import { Flex } from '@components/layout/flex'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * A button that opens and closes the corresponding accordion panel.
 *
 * Renders custom `children` when provided. When `label` is provided instead,
 * it is rendered through `Typography` and optional `startIcon` / `endIcon`
 * icons can be added.
 */
const AccordionTrigger = ({
    className,
    children,
    label,
    startIcon,
    endIcon,
    ...props
}: AccordionTriggerProps) => (
    <BaseAccordion.Header style={{ margin: 0 }}>
        <BaseAccordion.Trigger
            className={cn(ACCORDION_TRIGGER_STYLES.root, className)}
            {...props}
        >
            {label ? (
                <Flex
                    as={'span'}
                    alignItems={'center'}
                    gap={'sm'}
                >
                    {startIcon && (
                        <Icon
                            icon={startIcon}
                            size={'sm'}
                        />
                    )}
                    <Typography
                        as={'span'}
                        variant={'span'}
                        fontSize={'sm'}
                    >
                        {label}
                    </Typography>
                    {endIcon && (
                        <Icon
                            icon={endIcon}
                            size={'sm'}
                        />
                    )}
                </Flex>
            ) : (
                children
            )}
            <Icon
                icon={'lucide:chevron-down'}
                size={'sm'}
                className={accordionTriggerChevron}
                aria-hidden
            />
        </BaseAccordion.Trigger>
    </BaseAccordion.Header>
)

AccordionTrigger.displayName = 'Accordion.Trigger'

export default AccordionTrigger
