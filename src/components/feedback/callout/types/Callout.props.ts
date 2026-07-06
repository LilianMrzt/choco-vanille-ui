import type * as React from 'react'

import type { CalloutRole, CalloutVariant } from '@components/feedback/callout/types/Callout.types.ts'
import type { IconProps } from '@components/foundation/icon'

/** Props for the root Callout container. */
export type CalloutProps = React.HTMLAttributes<HTMLDivElement> &
  React.RefAttributes<HTMLDivElement> & {
    /** Visual intent variant. Defaults to "info". */
    variant?: CalloutVariant;
    /**
     * Accessible live-region role. Defaults to "status" (polite). Use "alert"
     * for critical, time-sensitive messages that should interrupt the screen
     * reader, or "none" to opt out of live-region semantics entirely.
     */
    role?: CalloutRole;
    /** Optional icon identifier. A default icon is provided per variant. */
    icon?: IconProps['icon'];
    /** Optional title text. */
    title?: React.ReactNode;
    /** Optional description content. */
    description?: React.ReactNode;
  };
