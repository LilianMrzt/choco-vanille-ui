import {
    type StatusBadgeProps
} from '@components/data-display/status-badge'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/data-display/status-badge/utils/create-status-badge-source/sources/createStatusBadgeSource.source.txt?raw'

/**
 * Creates consumer JSX for the playground's fixed Avatar composition.
 * @param _source - Generated Storybook source, replaced by the consumer example.
 * @param context - Current indicator and wrapper props.
 * @param context.args - Controls values, preserving zero and empty labels.
 * @returns Public usage with cleared optional values omitted.
 */
export const createStatusBadgeSource = (_source: string, { args }: Readonly<{ args: StatusBadgeProps }>): string => {
    const color = args.color === undefined ? '' : ` color="${args.color}"`
    const position = args.position === undefined ? '' : ` position="${args.position}"`
    const size = args.size === undefined ? '' : ` size="${args.size}"`
    const number = args.number === undefined ? '' : ` number={${args.number}}`
    const label = args.label === undefined ? '' : ` label={${JSON.stringify(args.label)}}`
    const display = args.display === undefined ? '' : ` display="${args.display}"`
    const style = args.style === undefined ? '' : ` style={${JSON.stringify(args.style)}}`

    return renderSource(sourceTemplate, { color, position, size, number, label, display, style })
}
