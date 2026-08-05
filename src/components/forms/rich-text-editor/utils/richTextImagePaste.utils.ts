import type { EditorView } from '@tiptap/pm/view'

import { normalizeRichTextUrl } from '@components/forms/rich-text-editor/utils/richText.utils.ts'

const IMAGE_URL_PATTERN = /^https?:\/\/[^\s]+?\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#][^\s]*)?$/i

const getSafeImageUrl = (value: string): string | undefined => {
    const url = value.trim()

    if (url.startsWith('data:image/')) {
        return url
    }

    const normalizedUrl = normalizeRichTextUrl(url)

    return normalizedUrl && /^https?:\/\//i.test(normalizedUrl)
        ? normalizedUrl
        : undefined
}

const insertImage = (view: EditorView, src: string, alt?: string) => {
    const imageNode = view.state.schema.nodes.image.create({
        src,
        ...(alt ? { alt } : {}),
    })

    view.dispatch(view.state.tr.replaceSelectionWith(imageNode).scrollIntoView())
}

export const handleRichTextImagePaste = (view: EditorView, event: ClipboardEvent): boolean => {
    const clipboardData = event.clipboardData

    if (!clipboardData) {
        return false
    }

    const imageFile = Array.from(clipboardData.items)
        .find((item) => item.kind === 'file' && item.type.startsWith('image/'))
        ?.getAsFile()

    if (imageFile) {
        const reader = new FileReader()
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                insertImage(view, reader.result)
            }
        }
        reader.readAsDataURL(imageFile)
        return true
    }

    const html = clipboardData.getData('text/html')
    const imageElement = html
        ? new DOMParser().parseFromString(html, 'text/html').querySelector('img')
        : null
    const htmlImageUrl = imageElement ? getSafeImageUrl(imageElement.src) : undefined

    if (htmlImageUrl) {
        insertImage(view, htmlImageUrl, imageElement?.alt)
        return true
    }

    const text = clipboardData.getData('text/plain').trim()
    const imageUrl = IMAGE_URL_PATTERN.test(text) ? getSafeImageUrl(text) : undefined

    if (imageUrl) {
        insertImage(view, imageUrl)
        return true
    }

    return false
}
