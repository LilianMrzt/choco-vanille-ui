import { SPACE_VARIANTS } from '@constants/styles/spaceVariants.const.ts'
import { resolveBoxProps } from '@components/layout/box/utils/resolveBoxProps.utils'
import { INSET_STYLES } from '@components/layout/inset/Inset.css.ts'
import type { InsetComponent, InsetProps } from '@components/layout/inset/types'
import { resolveInsetPadding } from '@components/layout/inset/utils/resolveInsetPadding.utils.ts'
import { cn } from '@utils/cn.ts'
import { createElement, type ElementType, type ReactElement } from 'react'

/**
 * Negative-margin utility that pulls content to the edge of its parent's
 * padding on a given `side` (`all`, `block`, `inline`, or a physical side). The `space`
 * token matches the parent's padding so inset content bleeds flush to the
 * container border. The `clip` prop controls border-box vs padding-box
 * clipping. Native attributes and ref target the element selected by `as`.
 * The consumer's inline style can override the computed inset variable.
 *
 * @template Element - Native element or custom component selected by as.
 * @param props - Inset and inherited layout attributes.
 * @param props.space - Spacing token matching the parent padding.
 * @param props.side - Sides to bleed; defaults to `all`.
 * @param props.clip - Background clipping; defaults to `border-box`.
 * @param props.padding - Padding token or `current` for the inset space.
 * @param props.paddingX - Inline padding token or `current`.
 * @param props.paddingY - Block padding token or `current`.
 * @param props.paddingTop - Top padding token or `current`.
 * @param props.paddingRight - Right padding token or `current`.
 * @param props.paddingBottom - Bottom padding token or `current`.
 * @param props.paddingLeft - Left padding token or `current`.
 * @param props.className - Additional container class.
 * @param props.style - Inline style overrides.
 * @returns A container extending into its parent's padding.
 * @example
 * <Inset space={16} side="top">Full-width content</Inset>
 */
const Inset: InsetComponent = <Element extends ElementType = 'div'>({
    space,
    side = 'all',
    clip = 'border-box',
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    className,
    style,
    ...props
}: InsetProps<Element> & Readonly<{ as?: Element }>): ReactElement => {
    const insetStyle = {
        [INSET_STYLES.insetSpaceProperty]: SPACE_VARIANTS[space],
        ...style,
    }

    return createElement(
        props.as ?? 'div',
        resolveBoxProps({
            padding: resolveInsetPadding(padding, space),
            paddingX: resolveInsetPadding(paddingX, space),
            paddingY: resolveInsetPadding(paddingY, space),
            paddingTop: resolveInsetPadding(paddingTop, space),
            paddingRight: resolveInsetPadding(paddingRight, space),
            paddingBottom: resolveInsetPadding(paddingBottom, space),
            paddingLeft: resolveInsetPadding(paddingLeft, space),
            className: cn(INSET_STYLES.recipe({ clip, side }), className),
            style: insetStyle,
            ...props,
        }),
    )
}

export default Inset
