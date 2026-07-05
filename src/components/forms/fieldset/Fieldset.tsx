import { FIELDSET_STYLES } from '@components/forms/fieldset/Fieldset.css.ts'
import type { FieldsetProps } from '@components/forms/fieldset/types/Fieldset.props.ts'
import { cn } from '@utils/cn.ts'
import { forwardRef } from 'react'

/**
 * A thin wrapper around the native `<fieldset>` element.
 *
 * Fieldsets group related form controls and are required for accessible
 * labeling of radio groups, checkbox groups, and any other set of controls
 * that share a single question or purpose. Pair it with `Legend` to provide
 * the group label.
 *
 * @example
 * ```tsx
 * <Fieldset>
 *   <Legend>Choose a plan</Legend>
 *   <RadioGroup>
 *     <RadioGroup.Item value="starter" label="Starter" />
 *     <RadioGroup.Item value="pro" label="Pro" />
 *   </RadioGroup>
 * </Fieldset>
 * ```
 */
const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
    ({ className, children, ...props }, ref) => (
        <fieldset
            ref={ref}
            className={cn(FIELDSET_STYLES.root, className)}
            {...props}
        >
            {children}
        </fieldset>
    ),
)

Fieldset.displayName = 'Fieldset'

export default Fieldset
