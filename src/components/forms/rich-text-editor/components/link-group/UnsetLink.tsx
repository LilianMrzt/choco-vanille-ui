import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { Tooltip } from '@components/overlay/tooltip'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'

type UnsetLinkProps = {
    presentation?: 'icon' | 'menu'
}

const UnsetLink = ({ presentation = 'icon' }: UnsetLinkProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    if (presentation === 'menu') {
        return (
            <DropdownMenu.Item
                label={labels.removeLink}
                startIcon={'lucide:unlink'}
                disabled={!editor.isActive('link')}
                onClick={() => editor.chain().focus().unsetLink().run()}
            />
        )
    }

    return (
        <Tooltip
            content={labels.removeLink}
            delayDuration={700}
            position={'top'}
        >
            <IconButton
                type={'button'}
                icon={'lucide:unlink'}
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
