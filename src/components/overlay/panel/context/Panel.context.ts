import { createContext, useContext } from 'react'

type PanelContextValue = {
    titleId: string
    hasTitle: boolean
    setHasTitle: (hasTitle: boolean) => void
}

export const PanelContext = createContext<PanelContextValue | null>(null)

export const usePanelContext = (): PanelContextValue => {
    const context = useContext(PanelContext)

    if (!context) {
        throw new Error('Panel components must be used within a Panel root.')
    }

    return context
}
