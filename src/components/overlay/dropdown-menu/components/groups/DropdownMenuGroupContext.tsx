import { createContext, useContext } from 'react'

/**
 * Tracks whether a `DropdownMenuLabel` is rendered inside a
 * `DropdownMenu.Group` or `DropdownMenu.RadioGroup`. Base UI's
 * `Menu.GroupLabel` requires that ancestor, so when the label is used
 * standalone we fall back to a plain styled element.
 */
const DropdownMenuGroupContext = createContext(false)

export const DropdownMenuGroupProvider = DropdownMenuGroupContext.Provider

export const useDropdownMenuGroup = () => useContext(DropdownMenuGroupContext)
