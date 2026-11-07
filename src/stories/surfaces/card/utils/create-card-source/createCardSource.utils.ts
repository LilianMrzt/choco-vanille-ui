import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import type { CardStoryArgs } from '@stories/surfaces/card/types'
import sourceTemplate from '@stories/surfaces/card/utils/create-card-source/sources/createCardSource.source.txt?raw'
import footerTemplate from '@stories/surfaces/card/utils/create-card-source/sources/footer.source.txt?raw'
import { LAYOUT_ARG_TYPES } from '@stories/_shared/layout-controls/constants'

/**
 * Serializes a present property into a JSX attribute.
 * @internal Storybook-only utility; not part of the public package API.
 * @param name - Attribute name.
 * @param value - Serializable attribute value.
 * @returns A JSX attribute or an empty string when the value is absent.
 * @example
 * serializeAttribute('size', 12)
 */
const serializeAttribute = (name: string, value: string | number | undefined): string =>
    value === undefined ? '' : ` ${name}={${JSON.stringify(value)}}`

/**
 * Generates public compound JSX for the current card controls.
 * @internal Storybook-only utility; not part of the public package API.
 * @param _source - Generated Storybook source, replaced by this example.
 * @param context - Current story context.
 * @param context.args - Current card and demonstration props.
 * @returns Consumer JSX for the displayed composition.
 * @example
 * createCardSource('', { args: { title: 'Account', showFooter: true } })
 */
export const createCardSource = (_source: string, { args }: Readonly<{ args: CardStoryArgs }>): string => {
    const explicitProps = new Set(['as', 'borderRadius', 'borderWidth', 'borderStyle', 'borderColor', 'backgroundColor', 'color', 'boxShadow', 'overflow', 'padding', 'children', 'className', 'style', 'ref'])
    const layoutProps = Object.entries(args).map(([name, value]) => {
        if (name in LAYOUT_ARG_TYPES && !explicitProps.has(name) && (typeof value === 'string' || typeof value === 'number')) {
            return serializeAttribute(name, value)
        }

        return ''
    }).join('')
    const rootProps = [
        layoutProps,
        serializeAttribute('as', args.as),
        serializeAttribute('borderRadius', args.borderRadius),
        serializeAttribute('borderWidth', args.borderWidth),
        serializeAttribute('borderStyle', args.borderStyle),
        serializeAttribute('borderColor', args.borderColor),
        serializeAttribute('backgroundColor', args.backgroundColor),
        serializeAttribute('color', args.color),
        serializeAttribute('boxShadow', args.boxShadow),
        serializeAttribute('overflow', args.overflow),
        serializeAttribute('padding', args.padding),
    ].join('')
    const titleProps = args.titleFontSize === undefined && args.titleFontWeight === undefined
        ? ''
        : ` titleProps={${JSON.stringify({ fontSize: args.titleFontSize, fontWeight: args.titleFontWeight })}}`
    const descriptionProps = args.descriptionFontSize === undefined
        ? ''
        : ` descriptionProps={${JSON.stringify({ fontSize: args.descriptionFontSize })}}`
    const headerProps = [
        serializeAttribute('as', args.headerAs),
        serializeAttribute('title', args.title),
        serializeAttribute('titleAs', args.titleAs),
        titleProps,
        serializeAttribute('description', args.description),
        descriptionProps,
    ].join('')
    const bodyProps = serializeAttribute('as', args.bodyAs) + serializeAttribute('padding', args.bodyPadding)
    const footer = args.showFooter
        ? renderSource(footerTemplate, {
            footerProps: serializeAttribute('as', args.footerAs),
            actionLabel: JSON.stringify(args.footerActionLabel ?? 'Save changes'),
        })
        : ''

    return renderSource(sourceTemplate, { rootProps, headerProps, bodyProps, footer })
}
