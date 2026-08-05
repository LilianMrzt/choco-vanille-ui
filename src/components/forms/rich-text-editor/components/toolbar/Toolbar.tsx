import { memo, type FC } from 'react'

import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import type { ToolbarProps } from '@components/forms/rich-text-editor/components/toolbar/types/Toolbar.props.ts'
import { cn } from '@utils/cn.ts'

const Toolbar: FC<ToolbarProps> = memo(({ children, 'aria-label': ariaLabel, className }) => (
    <div
        className={cn(EDITOR_TOOLBAR_STYLES.root, className)}
        role={'toolbar'}
        aria-label={ariaLabel ?? 'Text formatting'}
        onKeyDown={(event) => {
            const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'))
            const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)

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
                buttons[nextIndex].focus()
            }
        }}
    >
        {children}
    </div>
))

Toolbar.displayName = 'RichTextEditor.Toolbar'

export default Toolbar
