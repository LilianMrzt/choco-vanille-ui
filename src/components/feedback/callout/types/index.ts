import type * as React from 'react'

import type Callout from '@components/feedback/callout/Callout.tsx'
import type { IconProps } from '@components/foundation/icon'

/** Visual intent variants. */
export type CalloutVariant = 'info' | 'success' | 'warning' | 'error'
/** Live-region role. */
export type CalloutRole = 'alert' | 'status' | undefined

/** Root callout attributes and options. */
export type CalloutProps = Readonly<React.HTMLAttributes<HTMLDivElement> &
    React.RefAttributes<HTMLDivElement> & {
        /** Visual intent; defaults to `info`. */
        variant?: CalloutVariant
        /** Live-region role; defaults to `status`. Explicit `undefined` removes the role. */
        role?: CalloutRole
        /** Optional icon; a default is provided per variant. */
        icon?: IconProps['icon']
        /** Optional title content. */
        title?: React.ReactNode
        /** Optional description content. */
        description?: React.ReactNode
    }>

/** Callout root and its compound slots. */
export type CalloutCompound = typeof Callout
