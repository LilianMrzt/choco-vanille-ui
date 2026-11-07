import { type BadgeProps } from '@components/data-display/badge'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import sourceTemplate from '@stories/data-display/badge/utils/create-badge-source/sources/createBadgeSource.source.txt?raw'

/**
 * Creates consumer JSX from current Controls, including mapped icon expressions.
 * @param _source - Generated Storybook source, replaced by the consumer example.
 * @param context - Badge props after applying icon control mappings.
 * @param context.args - Current component and native props.
 * @returns Public usage with cleared optional values omitted.
 * @example
 * createBadgeSource('', { args: { label: 'Verified', color: 'success' } })
 */
export const createBadgeSource = (_source: string, { args }: Readonly<{ args: BadgeProps }>): string => {
    const variant = args.variant === undefined ? '' : ` variant="${args.variant}"`
    const color = args.color === undefined ? '' : ` color="${args.color}"`
    const size = args.size === undefined ? '' : ` size="${args.size}"`
    const borderRadius = args.borderRadius === undefined ? '' : ` borderRadius={${JSON.stringify(args.borderRadius)}}`
    const startIcon = args.startIcon ? ' startIcon={CheckIcon}' : ''
    const endIcon = args.endIcon ? ' endIcon={ChevronRightIcon}' : ''
    const width = args.width === undefined ? '' : ` width={${JSON.stringify(args.width)}}`
    const maxWidth = args.maxWidth === undefined ? '' : ` maxWidth={${JSON.stringify(args.maxWidth)}}`
    const className = args.className === undefined ? '' : ` className={${JSON.stringify(args.className)}}`
    const style = args.style === undefined ? '' : ` style={${JSON.stringify(args.style)}}`

    return renderSource(sourceTemplate, {
        label: JSON.stringify(args.label),
        variant,
        color,
        size,
        borderRadius,
        width,
        maxWidth,
        className,
        style,
        startIcon,
        endIcon,
    })
}
