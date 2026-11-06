import { createContext, useContext } from 'react'

type PanelContextValue = {
    titleId: string
    hasTitle: boolean
    withBackdrop: boolean
    setHasTitle: (hasTitle: boolean) => void
}

export const PanelContext = createContext<PanelContextValue | null>(null)

/**
 * Reads panel state shared by its content and header.
 * @returns The current panel context.
 * @throws When used outside a panel root.
 * @example
 * const { titleId } = usePanelContext()
 */
export const usePanelContext = (): PanelContextValue => {
    const context = useContext(PanelContext)

    if (!context) {
        throw new Error('Panel components must be used within a Panel root.')
    }

    return context
}
