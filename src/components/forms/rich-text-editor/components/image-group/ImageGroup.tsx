import { IconButton } from '@components/actions/icon-button'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRef, useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import { IMAGE_GROUP_STYLES } from '@components/forms/rich-text-editor/components/image-group/styles/ImageGroup.css.ts'
import type { ImageGroupProps } from '@components/forms/rich-text-editor/components/image-group/types/ImageGroup.props.ts'

const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024

const ImageGroup = ({ presentation = 'menu' }: ImageGroupProps) => {
    const { editor, disabled, onImageUpload, labels } = useRichTextEditorContext()
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [open, setOpen] = useState(false)

    if (!editor) {
        return null
    }

    return (
        <div
            className={IMAGE_GROUP_STYLES.root}
            role={'group'}
            aria-label={labels.imageGroup}
        >
            {presentation === 'inline' ? (
                <>
                    <IconButton
                        type={'button'}
                        icon={'lucide:image-plus'}
                        aria-label={labels.insertImageUrl}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => { const src = window.prompt(labels.imageUrlPrompt); if (src) { editor.chain().focus().setImage({ src }).run() } }}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:upload'}
                        aria-label={labels.uploadImage}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled}
                        onClick={() => imageInputRef.current?.click()}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:image-up'}
                        aria-label={labels.editImageDetails}
                        variant={'ghost'}
                        color={'primary'}
                        size={'sm'}
                        disabled={disabled || !editor.isActive('image')}
                        onClick={() => { const attributes = editor.getAttributes('image'); const alt = window.prompt(labels.imageAltPrompt, attributes.alt ?? ''); const width = window.prompt(labels.imageWidthPrompt, attributes.width ?? '100%'); editor.chain().focus().updateAttributes('image', { ...(alt !== null ? { alt } : {}), ...(width !== null ? { width } : {}) }).run() }}
                    />
                    <IconButton
                        type={'button'}
                        icon={'lucide:trash-2'}
                        aria-label={labels.removeImage}
                        variant={'ghost'}
                        color={'destructive'}
                        size={'sm'}
                        disabled={disabled || !editor.isActive('image')}
                        onClick={() => editor.chain().focus().deleteSelection().run()}
                    />
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={open}
                    onOpenChange={setOpen}
                >
                    <DropdownMenu.Trigger>
                        <IconButton
                            type={'button'}
                            icon={'lucide:image'}
                            aria-label={labels.imageGroupTrigger}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            active={open}
                            disabled={disabled}
                        />
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content aria-label={labels.imageOptions}>
                        <DropdownMenu.Item
                            label={labels.insertImageUrl}
                            startIcon={'lucide:image-plus'}
                            onClick={() => {
                                const src = window.prompt(labels.imageUrlPrompt)

                                if (src) {
                                    editor.chain().focus().setImage({ src }).run()
                                }
                            }}
                        />
                        <DropdownMenu.Item
                            label={labels.uploadImage}
                            startIcon={'lucide:upload'}
                            onClick={() => imageInputRef.current?.click()}
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            label={labels.editImageDetails}
                            startIcon={'lucide:image-up'}
                            disabled={!editor.isActive('image')}
                            onClick={() => {
                                const attributes = editor.getAttributes('image')
                                const alt = window.prompt(labels.imageAltPrompt, attributes.alt ?? '')
                                const width = window.prompt(labels.imageWidthPrompt, attributes.width ?? '100%')

                                editor.chain().focus().updateAttributes('image', {
                                    ...(alt !== null ? { alt } : {}),
                                    ...(width !== null ? { width } : {}),
                                }).run()
                            }}
                        />
                        <DropdownMenu.Item
                            label={labels.removeImage}
                            startIcon={'lucide:trash-2'}
                            destructive
                            disabled={!editor.isActive('image')}
                            onClick={() => editor.chain().focus().deleteSelection().run()}
                        />
                    </DropdownMenu.Content>
                </DropdownMenu>
            )}
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

ImageGroup.displayName = 'RichTextEditor.ImageGroup'

export default ImageGroup
