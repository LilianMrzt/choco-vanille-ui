import type { IconProps } from '@components/foundation/icon'
import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import template from '@stories/foundation/icon/utils/create-icon-source/sources/createIconSource.source.tsx.txt?raw'

/**
 * Produces consumer JSX for the editable icon controls.
 * @internal Not part of the public package API.
 * @param _source - Storybook-generated source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current icon and wrapper props.
 * @returns Public consumer JSX using the example SVG.
 * @example
 * createIconSource('', { args: { icon: SearchIcon, size: 'sm' } })
 */
export const createIconSource = (_source: string, { args }: Readonly<{ args: IconProps }>): string => {
    const values = {
        size: args.size,
        spin: args.spin,
        color: args.color,
        padding: args.padding,
        borderColor: args.borderColor,
        backgroundColor: args.backgroundColor,
        borderWidth: args.borderWidth,
        borderStyle: args.borderStyle,
        borderRadius: args.borderRadius,
        'aria-label': args['aria-label'],
        className: args.className,
        style: args.style,
    }
    const attributes = Object.entries(values)
        .filter(([, value]) => value !== undefined)
        .map(([name, value]) => ` ${name}={${JSON.stringify(value)}}`)
        .join('')

    return renderSource(template, { attributes })
}
