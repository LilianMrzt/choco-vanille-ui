import { memo, type FC } from 'react'

import { HELPER_TEXT_STYLES } from '@components/forms/primitives/helper-text/HelperText.css.ts'
import type { HelperTextProps } from '@components/forms/primitives/helper-text/types'

/**
 * Supporting text for a form control. Associate it using `aria-describedby`.
 * Normal messages are polite status regions; errors are assertive alerts.
 * @param props - Content, ID and announcement settings.
 * @param props.id - ID referenced by the control.
 * @param props.hasError - Uses error styling and an assertive announcement.
 * @param props.role - Overrides the default live-region role.
 * @param props["aria-live"] - Overrides the default announcement politeness.
 * @param props.children - Supporting message.
 * @returns The supporting text.
 * @example
 * ```tsx
 * <HelperText id="email-help">Use your work email.</HelperText>
 * ```
 */
const HelperText: FC<HelperTextProps> = memo(({
    id,
    hasError = false,
    role: roleProp,
    'aria-live': ariaLiveProp,
    children,
}) => {
    const role = roleProp ?? (hasError ? 'alert' : 'status')
    const ariaLive = ariaLiveProp ?? (hasError ? 'assertive' : 'polite')

    return (
        <span
            id={id}
            role={role}
            aria-live={ariaLive}
            className={hasError ? HELPER_TEXT_STYLES.error : HELPER_TEXT_STYLES.root}
        >
            {children}
        </span>
    )
})

HelperText.displayName = 'HelperText'

export default HelperText
