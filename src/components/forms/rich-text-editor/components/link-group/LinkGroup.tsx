import { LINK_GROUP_STYLES } from '@components/forms/rich-text-editor/components/link-group/styles/LinkGroup.css.ts'
import SetLink from '@components/forms/rich-text-editor/components/link-group/SetLink.tsx'
import UnsetLink from '@components/forms/rich-text-editor/components/link-group/UnsetLink.tsx'

const LinkGroup = () => {
    return (
        <div
            className={LINK_GROUP_STYLES.root}
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
