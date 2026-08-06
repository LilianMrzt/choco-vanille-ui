import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'
import SetLink from '@components/forms/rich-text-editor/components/link-group/SetLink.tsx'
import UnsetLink from '@components/forms/rich-text-editor/components/link-group/UnsetLink.tsx'

const LinkGroup = () => {
    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Links'}
        >
            <SetLink />
            <UnsetLink />
        </div>
    )
}

LinkGroup.displayName = 'RichTextEditor.LinkGroup'

export default LinkGroup
