import { memo, type FC } from 'react'

import { FORM_LABEL_STYLES } from '@components/forms/_shared/components/form-label/styles/FormLabel.css.ts'
import type { FormLabelProps } from '@components/forms/_shared/components/form-label/types/FormLabel.props.ts'
import { cn } from '@utils/cn.ts'
import { vars } from '@theme/contract.css.ts'

/**
 * Reusable label for form controls with the standard typography and disabled
 * presentation.
 */
const FormLabel: FC<FormLabelProps> = memo(
    ({ className, style, fontSize = 'md', disabled, required, ref, children, ...props }) => (
        <label
            {...props}
            ref={ref}
            className={cn(FORM_LABEL_STYLES.root, className)}
            style={{ fontSize: vars.fontSize[fontSize], ...style }}
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
        </label>
    ),
)

FormLabel.displayName = 'FormLabel'

export default FormLabel
