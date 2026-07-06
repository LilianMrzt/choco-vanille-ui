import { createContext } from 'react'

import type { CalloutVariant } from '@components/feedback/callout/types/Callout.types.ts'

export interface CalloutContextValue {
    variant: CalloutVariant
}

export const CalloutContext = createContext<CalloutContextValue>({ variant: 'info' })
