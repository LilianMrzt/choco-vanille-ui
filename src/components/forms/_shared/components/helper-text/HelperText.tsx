import type { FC, ReactNode } from 'react'

import { helperTextClass, helperTextErrorClass } from '@components/forms/_shared/components/helper-text/HelperText.css.ts'

export type HelperTextProps = {
    /** Unique id so the associated input can reference it via `aria-describedby`. */
    id?: string
    /** When `true`, renders in the destructive colour. */
    error?: boolean
    children: ReactNode
}

/**
 * Inline helper / error text displayed below a form field.
 *
 * Used by TextField (and any other form control that needs assistive copy).
 */
const HelperText: FC<HelperTextProps> = ({ id, error = false, children }) => (
    <span
        id={id}
        className={error ? helperTextErrorClass : helperTextClass}
    >
        {children}
    </span>
)

HelperText.displayName = 'HelperText'

export default HelperText
