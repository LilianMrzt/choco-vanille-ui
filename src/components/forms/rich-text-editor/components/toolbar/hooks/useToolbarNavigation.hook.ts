import { useCallback, useEffect, useRef, type FocusEvent, type KeyboardEvent, type ReactNode } from 'react'

const getToolbarButtons = (toolbar: HTMLDivElement) =>
    Array.from(toolbar.querySelectorAll<HTMLButtonElement>('button'))

export const useToolbarNavigation = (children: ReactNode) => {
    const toolbarRef = useRef<HTMLDivElement>(null)

    const setRovingTabIndex = useCallback((activeButton?: HTMLButtonElement) => {
        const toolbar = toolbarRef.current

        if (!toolbar) {
            return
        }

        const buttons = getToolbarButtons(toolbar)
        const enabledButtons = buttons.filter((button) => !button.disabled)
        const nextActiveButton = activeButton && enabledButtons.includes(activeButton)
            ? activeButton
            : enabledButtons.find((button) => button.tabIndex === 0) ?? enabledButtons[0]

        for (const button of buttons) {
            button.tabIndex = button === nextActiveButton ? 0 : -1
        }
    }, [])

    useEffect(() => {
        setRovingTabIndex()
    }, [children, setRovingTabIndex])

    const handleFocus = useCallback((event: FocusEvent<HTMLDivElement>) => {
        if (event.target instanceof HTMLButtonElement) {
            setRovingTabIndex(event.target)
        }
    }, [setRovingTabIndex])

    const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
        const buttons = getToolbarButtons(event.currentTarget)
            .filter((button) => !button.disabled)
        const currentButton = event.target instanceof HTMLButtonElement
            ? event.target
            : undefined
        const currentIndex = currentButton ? buttons.indexOf(currentButton) : -1

        if (currentIndex === -1) {
            return
        }

        const nextIndex = event.key === 'ArrowRight'
            ? (currentIndex + 1) % buttons.length
            : event.key === 'ArrowLeft'
                ? (currentIndex - 1 + buttons.length) % buttons.length
                : event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                        ? buttons.length - 1
                        : undefined

        if (nextIndex !== undefined) {
            event.preventDefault()
            setRovingTabIndex(buttons[nextIndex])
            buttons[nextIndex].focus()
        }
    }, [setRovingTabIndex])

    return {
        toolbarRef,
        handleFocus,
        handleKeyDown,
    }
}
