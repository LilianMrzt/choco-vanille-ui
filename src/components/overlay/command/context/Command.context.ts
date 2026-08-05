import { createContext, type Dispatch, type RefObject, type SetStateAction, useContext } from 'react'

/** Internal state shared by all Command compound slots. */
export type CommandContextValue = {
    /** Current search string entered in `Command.Input`. */
    search: string
    setSearch: Dispatch<SetStateAction<string>>
    /** ID of the currently highlighted `Command.Item` (`aria-activedescendant`). */
    activeId: string | undefined
    setActiveId: Dispatch<SetStateAction<string | undefined>>
    /** Stable ID for `Command.List` — referenced by `Command.Input` as `aria-controls`. */
    listId: string
    /** Ref attached to the `Command.List` DOM node for keyboard navigation DOM queries. */
    listRef: RefObject<HTMLDivElement | null>
}

export const CommandContext = createContext<CommandContextValue | null>(null)

/** Consume the Command context. Throws when used outside `Command.Content`. */
export const useCommandContext = (): CommandContextValue => {
    const ctx = useContext(CommandContext)
    if (!ctx) {
        throw new Error(
            'Command compound components must be rendered inside <Command.Content>.',
        )
    }
    return ctx
}
