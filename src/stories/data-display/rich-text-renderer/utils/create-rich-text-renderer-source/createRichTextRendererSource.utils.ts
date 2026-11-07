import { type RichTextRendererProps } from '@components/data-display/rich-text-renderer'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import rendererSource from '@stories/data-display/rich-text-renderer/utils/create-rich-text-renderer-source/sources/RichTextRenderer.source.txt?raw'

/**
 * Creates a typed document example matching the renderer Controls.
 * @param _source - Generated Storybook source, replaced by the consumer example.
 * @param context - Current document and container props.
 * @param context.args - Values serialized into the consumer template.
 * @returns Public imports, a structured document and a rendering component.
 */
export const createRichTextRendererSource = (_source: string, { args }: Readonly<{ args: RichTextRendererProps }>): string => {
    const as = typeof args.as === 'string' ? ` as="${args.as}"` : ''
    const width = args.width === undefined ? '' : ` width={${JSON.stringify(args.width)}}`
    const color = args.color === undefined ? '' : ` color={${JSON.stringify(args.color)}}`
    const style = args.style === undefined ? '' : ` style={${JSON.stringify(args.style)}}`

    return renderSource(rendererSource, {
        value: JSON.stringify(args.value, null, 4),
        as,
        width,
        color,
        style,
    })
}
