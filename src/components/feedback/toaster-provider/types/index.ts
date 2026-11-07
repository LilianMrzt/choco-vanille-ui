import type { ReactNode } from 'react'

import type { ToasterProps } from '@components/feedback/toaster/types'

/** Application-level notification mounting with the same configuration as Toaster. */
export type ToasterProviderProps = Readonly<ToasterProps & {
    /** Application content; no additional DOM wrapper is created. */
    children?: ReactNode
}>
