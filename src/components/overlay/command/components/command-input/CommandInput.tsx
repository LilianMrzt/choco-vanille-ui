import { CLOSE_ICON as CloseIcon, SEARCH_ICON as SearchIcon } from '@constants/icon-registry'
import { memo, type FC } from 'react'

import { IconButton } from '@components/actions/icon-button'
import { Icon } from '@components/foundation/icon'
import { useCommandContext } from '@components/overlay/command/context/Command.context.ts'
import { COMMAND_INPUT_STYLES } from '@components/overlay/command/components/command-input/CommandInput.css.ts'
import type { CommandInputProps } from '@components/overlay/command/components/command-input/types'
import { cn } from '@utils/cn.ts'

/**
 * The search input inside a `Command.Content` panel.
 *
 * Implements the WAI-ARIA combobox pattern:
 * - `role="combobox"` with `aria-expanded="true"` (always shown alongside the listbox)
 * - `aria-controls` pointing to the `Command.List` element
 * - `aria-activedescendant` reflecting the currently highlighted item
 *
 * Arrow-key and Enter-key handling is delegated to the `Command.Content`
 * wrapper via event bubbling so that the input retains full text-editing
 * keyboard shortcuts.
 *
 * A clear `IconButton` appears when the input has a value. Clicking it resets
 * the search and fires `onClear`. Override `defaultClearAriaLabel` for i18n.
 */
const CommandInput: FC<CommandInputProps> = memo(({
    className,
    placeholder = 'Search...',
    'aria-label': ariaLabel,
    defaultAriaLabel = 'Search',
    defaultClearAriaLabel = 'Clear search',
    onClear,
    onChange,
    ...props
}) => {
    const { search, setSearch, activeId, listId } = useCommandContext()

    const inputAriaLabel = ariaLabel ?? defaultAriaLabel

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value)
        onChange?.(event)
    }

    const handleClear = (): void => {
        setSearch('')
        onClear?.()
    }

    return (
        <div className={COMMAND_INPUT_STYLES.wrapper}>
            <span
                className={COMMAND_INPUT_STYLES.icon}
                aria-hidden
            >
                <Icon
                    icon={SearchIcon}
                    size={'sm'}
                />
            </span>
            <input
                type={'text'}
                role={'combobox'}
                aria-expanded={true}
                aria-controls={listId}
                aria-activedescendant={activeId}
                aria-label={inputAriaLabel}
                autoComplete={'off'}
                autoCorrect={'off'}
                autoCapitalize={'off'}
                spellCheck={false}
                className={cn(COMMAND_INPUT_STYLES.input, className)}
                placeholder={placeholder}
                value={search}
                onChange={handleChange}
                {...props}
            />
            {search && (
                <IconButton
                    type={'button'}
                    icon={CloseIcon}
                    aria-label={defaultClearAriaLabel}
                    variant={'ghost'}
                    size={'xs'}
                    onClick={handleClear}
                />
            )}
        </div>
    )
})

CommandInput.displayName = 'Command.Input'

export default CommandInput
