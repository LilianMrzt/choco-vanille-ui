import { memo, type FC } from 'react'

import { FORM_LABEL_STYLES } from '@components/forms/_shared/components/form-label/styles/FormLabel.css.ts'
import type { FormLabelProps } from '@components/forms/_shared/components/form-label/types/FormLabel.props.ts'
import { cn } from '@utils/cn.ts'
import { vars } from '@theme/styles/contract/contract.css.ts'

/**
 * Non-interactive form label text. Use `aria-labelledby` on the control when
 * rendering this label next to it.
 */
const FormLabel: FC<FormLabelProps> = memo(({
    className,
    style,
    fontSize = 16,
    disabled,
    required,
    children,
    ...props
}) => (
    <span
        {...props}
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
    </span>
))

FormLabel.displayName = 'FormLabel'

export default FormLabel
