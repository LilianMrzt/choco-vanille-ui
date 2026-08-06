import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'

type SetLinkProps = {
    presentation?: 'icon' | 'menu'
}

const SetLink = ({ presentation = 'icon' }: SetLinkProps) => {
    const { editor, disabled, labels } = useRichTextEditorContext()

    if (!editor) {
        return null
    }

    const handleSetLink = () => {
        const currentHref = editor.getAttributes('link').href as string | undefined
        const nextHref = window.prompt(labels.linkUrlPrompt, currentHref ?? 'https://')
        const href = nextHref ? normalizeRichTextUrl(nextHref) : undefined

        if (href) {
            editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
        }
    }

    if (presentation === 'menu') {
        return (
            <DropdownMenu.Item
                label={labels.addOrEditLink}
                startIcon={'lucide:link'}
                onClick={handleSetLink}
            />
        )
    }

    return (
        <IconButton
            type={'button'}
            icon={'lucide:link'}
            aria-label={labels.addOrEditLink}
            variant={'ghost'}
            color={'primary'}
            size={'sm'}
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleSetLink}
        />
    )
}

SetLink.displayName = 'RichTextEditor.SetLink'

export default SetLink
