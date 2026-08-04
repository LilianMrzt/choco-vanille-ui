import { createContext, useContext } from 'react'

export type ContextMenuInputModality = 'keyboard' | 'pointer'

type ContextMenuContextValue = {
    inputModality: ContextMenuInputModality
    setInputModality: (modality: ContextMenuInputModality) => void
}

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

export const useContextMenuContext = () => {
    const context = useContext(ContextMenuContext)

    if (!context) {
        throw new Error('ContextMenu compound components must be rendered within ContextMenu.')
    }

    return context
}
