import type { SeparatorProps } from '@components/layout/separator'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import horizontal from '@stories/layout/separator/sources/SeparatorHorizontal.source.tsx.txt?raw'
import vertical from '@stories/layout/separator/sources/SeparatorVertical.source.tsx.txt?raw'

/**
 * Renders the consumer source matching the current separator orientation.
 * @internal Not part of the public package API.
 * @param source - Generated source replaced by the example.
 * @param context - Current story context.
 * @param context.args - Separator props.
 * @returns Consumer JSX for the selected orientation.
 * @example
 * createSeparatorSource('', { args: { orientation: 'vertical' } })
 */
export const createSeparatorSource = (source: string, context: Readonly<{ args: SeparatorProps }>): string => {
    const template = context.args.orientation === 'vertical' ? vertical : horizontal

    return createPrimitiveSource<SeparatorProps>(template)(source, context)
}
