import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { Tooltip } from '@components/overlay/tooltip'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import UnlinkIcon from '@resources/asset/UnlinkIcon.svg?react'
import type { UnsetLinkProps } from '@components/forms/rich-text-editor/components/link-group/types/UnsetLink.props.ts'

/**
 * Toolbar control that removes the hyperlink from the current selection.
 * Use `presentation="icon"` (default) for a standalone icon button or
 * `"menu"` for a `DropdownMenu.Item` inside `LinkGroup`. Disabled when
 * the cursor is not on a link.
 */
const UnsetLink = ({ presentation = 'icon' }: UnsetLinkProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    if (presentation === 'menu') {
        return (
            <DropdownMenu.Item
                label={labels.removeLink}
                startIcon={UnlinkIcon}
                disabled={!editor.isActive('link')}
                onClick={() => editor.chain().focus().unsetLink().run()}
            />
        )
    }

    return (
        <Tooltip
            content={labels.removeLink}
            delayDuration={700}
            openOnFocus={false}
            position={'top'}
        >
            <IconButton
                type={'button'}
                icon={UnlinkIcon}
                aria-label={labels.removeLink}
                variant={'ghost'}
                color={'primary'}
                size={'sm'}
                disabled={disabled || !editor.isActive('link')}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => editor.chain().focus().unsetLink().run()}
            />
        </Tooltip>
    )
}

UnsetLink.displayName = 'RichTextEditor.UnsetLink'

export default UnsetLink
