import { memo, type FC } from 'react'

import { Accordion as BaseAccordion } from '@base-ui/react/accordion'

import { ACCORDION_TRIGGER_STYLES } from '@components/surfaces/accordion/components/accordion-trigger/styles/AccordionTrigger.css.ts'
import type { AccordionTriggerProps } from '@components/surfaces/accordion/components/accordion-trigger/types/AccordionTrigger.props.ts'
import { RotatingChevron } from '@components/_common/rotating-chevron'
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
const AccordionTrigger: FC<AccordionTriggerProps> = memo(({
    className,
    children,
    label,
    startIcon,
    endIcon,
    ...props
}) => (
    <BaseAccordion.Header style={{ margin: 0 }}>
        <BaseAccordion.Trigger
            className={cn(ACCORDION_TRIGGER_STYLES.root, className)}
            {...props}
        >
            {label ? (
                <Flex
                    as={'span'}
                    alignItems={'center'}
                    gap={8}
                >
                    {startIcon && (
                        <Icon
                            icon={startIcon}
                            size={14}
                        />
                    )}
                    <Typography
                        as={'span'}
                        variant={'span'}
                        fontSize={14}
                    >
                        {label}
                    </Typography>
                    {endIcon && (
                        <Icon
                            icon={endIcon}
                            size={14}
                        />
                    )}
                </Flex>
            ) : (
                children
            )}
            <RotatingChevron size={14} />
        </BaseAccordion.Trigger>
    </BaseAccordion.Header>
))

AccordionTrigger.displayName = 'Accordion.Trigger'

export default AccordionTrigger
