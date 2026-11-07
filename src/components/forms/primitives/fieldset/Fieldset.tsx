import { FIELDSET_STYLES } from '@components/forms/primitives/fieldset/Fieldset.css.ts'
import type { FieldsetProps } from '@components/forms/primitives/fieldset/types'
import { cn } from '@utils/cn.ts'
import { forwardRef, memo } from 'react'

/**
 * A thin wrapper around the native `<fieldset>` element.
 *
 * Fieldsets group related form controls and are required for accessible
 * labeling of radio groups, checkbox groups, and any other set of controls
 * that share a single question or purpose. Pair it with `Legend` to provide
 * the group label. Native attributes and events are forwarded to the fieldset;
 * the ref targets that element.
 *
 * @param props - Native fieldset attributes and children.
 * @param props.className - Additional class merged with the fieldset reset.
 * @param props.children - Group content, including its legend.
 * @param ref - Ref forwarded to the fieldset.
 * @returns A native fieldset grouping its children.
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
const Fieldset = memo(forwardRef<HTMLFieldSetElement, FieldsetProps>(
    ({ className, children, ...props }, ref) => (
        <fieldset
            ref={ref}
            className={cn(FIELDSET_STYLES.root, className)}
            {...props}
        >
            {children}
        </fieldset>
    ),
))

Fieldset.displayName = 'Fieldset'

export default Fieldset
