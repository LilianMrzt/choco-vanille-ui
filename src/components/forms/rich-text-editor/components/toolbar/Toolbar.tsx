import { memo, type FC } from 'react'

import { TOOLBAR_STYLES } from '@components/forms/rich-text-editor/components/toolbar/styles/Toolbar.css.ts'
import type { ToolbarProps } from '@components/forms/rich-text-editor/components/toolbar/types/Toolbar.props.ts'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { useToolbarNavigation } from '@components/forms/rich-text-editor/components/toolbar/hooks/useToolbarNavigation.hook.ts'
import { cn } from '@utils/cn.ts'

/**
 * Accessible `role="toolbar"` container with roving-tabindex keyboard
 * navigation for use inside `RichTextEditor`. Falls back to the
 * `RichTextEditor` context label when `aria-label` is not provided.
 */
const Toolbar: FC<ToolbarProps> = memo(({ children, 'aria-label': ariaLabel, className }) => {
    const { labels } = useRichTextEditorContext()
    const { toolbarRef, handleFocus, handleKeyDown } = useToolbarNavigation(children)

    return (
        <div
            ref={toolbarRef}
            className={cn(TOOLBAR_STYLES.root, className)}
            role={'toolbar'}
            aria-label={ariaLabel ?? labels.toolbar}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
        >
            {children}
        </div>
    )
})

Toolbar.displayName = 'RichTextEditor.Toolbar'

export default Toolbar
