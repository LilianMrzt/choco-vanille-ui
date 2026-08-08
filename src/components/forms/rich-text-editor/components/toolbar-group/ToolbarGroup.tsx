import { TOOLBAR_GROUP_STYLES } from '@components/forms/rich-text-editor/components/toolbar-group/styles/ToolbarGroup.css.ts'
import type { ToolbarGroupProps } from '@components/forms/rich-text-editor/components/toolbar-group/types/ToolbarGroup.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Logical `role="group"` container for related toolbar controls inside
 * a `Toolbar`. Requires an `aria-label` to name the group.
 */
const ToolbarGroup = ({
    children,
    className,
    'aria-label': ariaLabel,
}: ToolbarGroupProps) => (
    <div
        className={cn(TOOLBAR_GROUP_STYLES.root, className)}
        role={'group'}
        aria-label={ariaLabel}
    >
        {children}
    </div>
)

ToolbarGroup.displayName = 'RichTextEditor.ToolbarGroup'

export default ToolbarGroup
