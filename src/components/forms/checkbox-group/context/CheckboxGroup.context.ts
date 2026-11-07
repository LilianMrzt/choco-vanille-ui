import { createContext } from 'react'

import type { CheckboxGroupContextValue } from '@components/forms/checkbox-group/types'

/** Coordinates only the local parent-checkbox behavior. */
export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null)
