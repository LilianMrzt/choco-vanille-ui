import type { ProgressBaseProps } from '@components/feedback/progress'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/feedback/progress/utils/create-progress-source/sources/createProgressSource.source.txt?raw'

/**
 * Generates JSX reflecting the current story controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Storybook-generated source.
 * @param context - Current story context.
 * @param context.args - Current progress args.
 * @returns Consumer JSX.
 * @example
 * createProgressSource('', { args })
 */
export const createProgressSource = (_source: string, { args }: Readonly<{ args: ProgressBaseProps }>): string => {
    const attributes = Object.entries({
        value: args.value,
        label: 'label' in args ? args.label : undefined,
        'aria-label': 'aria-label' in args ? args['aria-label'] : undefined,
        'aria-labelledby': 'aria-labelledby' in args ? args['aria-labelledby'] : undefined,
        color: args.color,
        size: args.size,
        borderRadius: args.borderRadius,
        width: args.width,
        quantityLabel: args.quantityLabel,
    }).filter(([, value]) => value !== undefined)
        .map(([name, value]) => ` ${name}={${JSON.stringify(value)}}`)
        .join('')

    return renderSource(sourceTemplate, { attributes })
}
