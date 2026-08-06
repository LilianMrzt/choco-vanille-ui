import { LINK_GROUP_STYLES } from '@components/forms/rich-text-editor/components/link-group/styles/LinkGroup.css.ts'
import SetLink from '@components/forms/rich-text-editor/components/link-group/SetLink.tsx'
import UnsetLink from '@components/forms/rich-text-editor/components/link-group/UnsetLink.tsx'
import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { useState } from 'react'

const LinkGroup = () => {
    const { disabled, labels } = useRichTextEditorContext()
    const [open, setOpen] = useState(false)

    return (
        <div
            className={LINK_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.linkGroup}
        >
            <DropdownMenu
                modal={false}
                open={open}
                onOpenChange={setOpen}
            >
                <Tooltip
                    content={labels.linkGroupTrigger}
                    delayDuration={700}
                    position={'top'}
                >
                    <DropdownMenu.Trigger>
                        <IconButton
                            type={'button'}
                            icon={'lucide:link'}
                            aria-label={labels.linkGroupTrigger}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            active={open}
                            disabled={disabled}
                            title={labels.linkGroupTrigger}
                        />
                    </DropdownMenu.Trigger>
                </Tooltip>
                <DropdownMenu.Content aria-label={labels.linkOptions}>
                    <SetLink presentation={'menu'} />
                    <UnsetLink presentation={'menu'} />
                </DropdownMenu.Content>
            </DropdownMenu>
        </div>
    )
}

LinkGroup.displayName = 'RichTextEditor.LinkGroup'

export default LinkGroup
