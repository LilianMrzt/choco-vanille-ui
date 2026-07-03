import type { FC } from 'react'

import { HELPER_TEXT_STYLES } from '@components/forms/_shared/components/helper-text/HelperText.css.ts'
import type { HelperTextProps } from '@components/forms/_shared/components/helper-text/types'

/**
 * Inline helper / error text displayed below a form field.
 *
 * Used by TextField (and any other form control that needs assistive copy).
 */
const HelperText: FC<HelperTextProps> = ({
    id,
    error = false,
    role: roleProp,
    'aria-live': ariaLiveProp,
    children,
}) => {
    const role = roleProp ?? (error ? 'alert' : 'status')
    const ariaLive = ariaLiveProp ?? (error ? 'assertive' : 'polite')

    return (
        <span
            id={id}
            role={role}
            aria-live={ariaLive}
            className={error ? HELPER_TEXT_STYLES.error : HELPER_TEXT_STYLES.root}
        >
            {children}
        </span>
    )
}

HelperText.displayName = 'HelperText'

export default HelperText
