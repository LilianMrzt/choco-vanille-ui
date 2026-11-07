import type { IconButtonProps } from '@components/actions/icon-button'
import { createPrimitiveSource } from '@stories/_shared/primitive-source/utils/createPrimitiveSource.utils'
import template from '@stories/actions/icon-button/utils/create-icon-button-source/sources/IconButton.source.txt?raw'

/**
 * Serializes icon-button controls with a consumer-owned SVG.
 * @internal Not part of the public package API.
 * @param _source - Generated source replaced by the consumer example.
 * @param context - Current story context.
 * @param context.args - Native and visual button props.
 * @returns The current consumer source.
 * @example createIconButtonSource('', { args: { icon: SearchIcon, 'aria-label': 'Search' } })
 */
export const createIconButtonSource = (_source: string, context: Readonly<{ args: IconButtonProps }>): string =>
    createPrimitiveSource<IconButtonProps>(template, { omit: ['icon', 'onClick'] })(_source, context)
