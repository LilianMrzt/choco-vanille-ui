import type { AriaRole, ReactNode } from 'react'

export type HelperTextProps = {
    /** Unique id so the associated input can reference it via `aria-describedby`. */
    id?: string
    /** When `true`, renders in the destructive colour and announces assertively. */
    error?: boolean
    /**
     * Live-region role. Defaults to `status` for helper text and `alert` for errors.
     * Override for i18n or custom announcement behaviour.
     */
    role?: AriaRole
    /**
     * Live-region politeness. Defaults to `polite` for helper text and `assertive`
     * for errors.
     */
    'aria-live'?: 'off' | 'assertive' | 'polite'
    children: ReactNode
}
