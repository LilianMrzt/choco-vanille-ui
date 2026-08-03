import { createContext, useContext } from 'react'

export type ContextMenuInputModality = 'keyboard' | 'pointer'

type ContextMenuContextValue = {
    inputModality: ContextMenuInputModality
    setInputModality: (modality: ContextMenuInputModality) => void
}

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

export const useContextMenuContext = () => useContext(ContextMenuContext)
