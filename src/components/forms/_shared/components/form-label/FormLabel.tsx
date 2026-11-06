import { memo, type FC } from 'react'

import { FORM_LABEL_STYLES } from '@components/forms/_shared/components/form-label/styles/FormLabel.css.ts'
import type { FormLabelProps } from '@components/forms/_shared/components/form-label/types/FormLabel.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Selectable, non-interactive form label text. Associate it with a control
 * using `aria-labelledby`. Native span attributes and styles are forwarded.
 * The default font size is 14; the required indicator is hidden from assistive
 * technology, so the control must also expose its required state.
 * @param props - Label content, presentation and native span attributes.
 * @param props.className - Additional CSS class.
 * @param props.style - Inline style overrides.
 * @param props.disabled - Applies disabled presentation.
 * @param props.required - Shows a required indicator.
 * @param props.children - Visible label content.
 * @returns The label text.
 * @example
 * ```tsx
 * <FormLabel id="email-label">Email</FormLabel>
 * ```
 */
const FormLabel: FC<FormLabelProps> = memo(({
    className,
    style,
    disabled,
    required,
    children,
    ...props
}) => (
    <span
        {...props}
        className={cn(FORM_LABEL_STYLES.root, className)}
        style={style}
        data-disabled={disabled ? '' : undefined}
    >
        {children}
        {required && (
            <span
                className={FORM_LABEL_STYLES.requiredIndicator}
                aria-hidden={'true'}
            >
                {' *'}
            </span>
        )}
    </span>
))

FormLabel.displayName = 'FormLabel'

export default FormLabel
