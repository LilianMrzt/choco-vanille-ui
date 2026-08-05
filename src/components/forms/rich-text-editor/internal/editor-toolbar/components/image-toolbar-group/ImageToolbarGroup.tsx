import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRef, useState } from 'react'

import type { EditorToolbarProps } from '@components/forms/rich-text-editor/internal/editor-toolbar/types/EditorToolbar.props.ts'
import { EDITOR_TOOLBAR_STYLES } from '@components/forms/rich-text-editor/internal/editor-toolbar/styles/EditorToolbar.css.ts'

const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024

const ImageToolbarGroup = ({ editor, disabled, onImageUpload }: EditorToolbarProps) => {
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)

    return (
        <div
            className={EDITOR_TOOLBAR_STYLES.group}
            role={'group'}
            aria-label={'Image actions'}
        >
            <DropdownMenu
                modal={false}
                open={open}
                onOpenChange={setOpen}
            >
                <DropdownMenu.Trigger>
                    <IconButton
                        type={'button'}
                        icon={'lucide:image'}
                        aria-label={'Image actions'}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        active={open}
                        disabled={disabled}
                    />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content aria-label={'Image options'}>
                    <DropdownMenu.Item
                        label={'Insert image URL'}
                        startIcon={'lucide:image-plus'}
                        onClick={() => {
                            const src = window.prompt('Image URL')

                            if (src) {
                                editor.chain().focus().setImage({ src }).run()
                            }
                        }}
                    />
                    <DropdownMenu.Item
                        label={'Upload image'}
                        startIcon={'lucide:upload'}
                        onClick={() => imageInputRef.current?.click()}
                    />
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item
                        label={'Edit image details'}
                        startIcon={'lucide:image-up'}
                        disabled={!editor.isActive('image')}
                        onClick={() => {
                            const attributes = editor.getAttributes('image')
                            const alt = window.prompt('Image alternative text', attributes.alt ?? '')
                            const width = window.prompt('Image width', attributes.width ?? '100%')

                            editor.chain().focus().updateAttributes('image', {
                                ...(alt !== null ? { alt } : {}),
                                ...(width !== null ? { width } : {}),
                            }).run()
                        }}
                    />
                    <DropdownMenu.Item
                        label={'Remove image'}
                        startIcon={'lucide:trash-2'}
                        destructive
                        disabled={!editor.isActive('image')}
                        onClick={() => editor.chain().focus().deleteSelection().run()}
                    />
                </DropdownMenu.Content>
            </DropdownMenu>
            <input
                ref={imageInputRef}
                type={'file'}
                accept={'image/*'}
                hidden
                onChange={async (event) => {
                    const file = event.currentTarget.files?.[0]
                    event.currentTarget.value = ''

                    if (!file || !file.type.startsWith('image/') || file.size > MAX_IMAGE_FILE_SIZE) {
                        return
                    }

                    const src = onImageUpload
                        ? await onImageUpload(file)
                        : await new Promise<string>((resolve, reject) => {
                            const reader = new FileReader()
                            reader.onload = () => typeof reader.result === 'string'
                                ? resolve(reader.result)
                                : reject(new Error('Unable to read the image file.'))
                            reader.onerror = () => reject(reader.error ?? new Error('Unable to read the image file.'))
                            reader.readAsDataURL(file)
                        })

                    editor.chain().focus().setImage({ src }).run()
                }}
            />
        </div>
    )
}

export default ImageToolbarGroup
