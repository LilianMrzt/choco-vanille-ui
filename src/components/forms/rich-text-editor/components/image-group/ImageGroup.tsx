import { IconButton } from '@components/actions/icon-button'
import { Tooltip } from '@components/overlay/tooltip'
import { DropdownMenu } from '@components/overlay/dropdown-menu'
import { useRef, useState } from 'react'

import { useRichTextEditorContext } from '@components/forms/rich-text-editor/context/RichTextEditor.context.ts'
import ImageIcon from '@resources/asset/ImageIcon.svg?react'
import ImagePlusIcon from '@resources/asset/ImagePlusIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'
import { IMAGE_GROUP_STYLES } from '@components/forms/rich-text-editor/components/image-group/styles/ImageGroup.css.ts'
import type { ImageGroupProps } from '@components/forms/rich-text-editor/components/image-group/types/ImageGroup.props.ts'

const MAX_IMAGE_FILE_SIZE = 10 * 1024 * 1024

/**
 * Toolbar group for image commands: insert by URL, upload from disk, edit
 * attributes, and remove. Use `presentation="inline"` for individual icon
 * buttons or `"menu"` (default) for a dropdown trigger. Calls
 * `onImageUpload` from context when provided; otherwise reads the file as a
 * data URL (max 10 MB).
 */
const ImageGroup = ({ presentation = 'menu' }: ImageGroupProps) => {
    const { editor, disabled, onImageUpload, labels } =
    useRichTextEditorContext()
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
                    <Tooltip
                        content={labels.insertImageUrl}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={ImagePlusIcon}
                            aria-label={labels.insertImageUrl}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => {
                                const src = window.prompt(labels.imageUrlPrompt)
                                if (src) {
                                    editor.chain().focus().setImage({ src }).run()
                                }
                            }}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.uploadImage}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={UploadIcon}
                            aria-label={labels.uploadImage}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled}
                            onClick={() => imageInputRef.current?.click()}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.editImageDetails}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={ImagePlusIcon}
                            aria-label={labels.editImageDetails}
                            variant={'ghost'}
                            color={'primary'}
                            size={'sm'}
                            disabled={disabled || !editor.isActive('image')}
                            onClick={() => {
                                const attributes = editor.getAttributes('image')
                                const alt = window.prompt(
                                    labels.imageAltPrompt,
                                    attributes.alt ?? '',
                                )
                                const width = window.prompt(
                                    labels.imageWidthPrompt,
                                    attributes.width ?? '100%',
                                )
                                editor
                                    .chain()
                                    .focus()
                                    .updateAttributes('image', {
                                        ...(alt !== null ? { alt } : {}),
                                        ...(width !== null ? { width } : {}),
                                    })
                                    .run()
                            }}
                        />
                    </Tooltip>
                    <Tooltip
                        content={labels.removeImage}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <IconButton
                            type={'button'}
                            icon={TrashIcon}
                            aria-label={labels.removeImage}
                            variant={'ghost'}
                            color={'destructive'}
                            size={'sm'}
                            disabled={disabled || !editor.isActive('image')}
                            onClick={() => editor.chain().focus().deleteSelection().run()}
                        />
                    </Tooltip>
                </>
            ) : (
                <DropdownMenu
                    modal={false}
                    open={open}
                    onOpenChange={setOpen}
                >
                    <Tooltip
                        content={labels.imageGroupTrigger}
                        delayDuration={700}
                        openOnFocus={false}
                        position={'top'}
                    >
                        <DropdownMenu.Trigger>
                            <IconButton
                                type={'button'}
                                icon={ImageIcon}
                                aria-label={labels.imageGroupTrigger}
                                variant={'ghost'}
                                color={'primary'}
                                size={'sm'}
                                active={open}
                                disabled={disabled}
                            />
                        </DropdownMenu.Trigger>
                    </Tooltip>
                    <DropdownMenu.Content aria-label={labels.imageOptions}>
                        <DropdownMenu.Item
                            label={labels.insertImageUrl}
                            startIcon={ImagePlusIcon}
                            onClick={() => {
                                const src = window.prompt(labels.imageUrlPrompt)

                                if (src) {
                                    editor.chain().focus().setImage({ src }).run()
                                }
                            }}
                        />
                        <DropdownMenu.Item
                            label={labels.uploadImage}
                            startIcon={UploadIcon}
                            onClick={() => imageInputRef.current?.click()}
                        />
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item
                            label={labels.editImageDetails}
                            startIcon={ImagePlusIcon}
                            disabled={!editor.isActive('image')}
                            onClick={() => {
                                const attributes = editor.getAttributes('image')
                                const alt = window.prompt(
                                    labels.imageAltPrompt,
                                    attributes.alt ?? '',
                                )
                                const width = window.prompt(
                                    labels.imageWidthPrompt,
                                    attributes.width ?? '100%',
                                )

                                editor
                                    .chain()
                                    .focus()
                                    .updateAttributes('image', {
                                        ...(alt !== null ? { alt } : {}),
                                        ...(width !== null ? { width } : {}),
                                    })
                                    .run()
                            }}
                        />
                        <DropdownMenu.Item
                            label={labels.removeImage}
                            startIcon={TrashIcon}
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

                    if (
                        !file ||
            !file.type.startsWith('image/') ||
            file.size > MAX_IMAGE_FILE_SIZE
                    ) {
                        return
                    }

                    const src = onImageUpload
                        ? await onImageUpload(file)
                        : await new Promise<string>((resolve, reject) => {
                            const reader = new FileReader()
                            reader.onload = () =>
                                typeof reader.result === 'string'
                                    ? resolve(reader.result)
                                    : reject(new Error('Unable to read the image file.'))
                            reader.onerror = () =>
                                reject(
                                    reader.error ?? new Error('Unable to read the image file.'),
                                )
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
