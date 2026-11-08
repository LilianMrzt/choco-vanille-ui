import { FLEX_STYLES } from '@components/layout/flex/Flex.css.ts'
import type { FlexComponent, FlexProps } from '@components/layout/flex/types'
import { cn } from '@utils/cn.ts'
import { createElement, type ElementType, type ReactElement } from 'react'

import { resolveBoxProps } from '@components/layout/box/utils/resolveBoxProps.utils'

/**
 * Flex container built on `Box`. Sets `display: flex` (or `inline-flex`
 * when `inline` is true) with a configurable `gap` token. Accepts all
 * `Box` props for additional layout customization. Native attributes and ref
 * target the element selected by `as`, which defaults to `div`.
 *
 * @template Element - Native element or custom component selected by as.
 * @param props - Flex and inherited layout attributes.
 * @param props.inline - Use `inline-flex` instead of `flex`.
 * @param props.gap - Spacing token between children; defaults to `0`.
 * @param props.className - Additional container class.
 * @returns A flex container.
 * @example
 * <Flex gap={8}><span>One</span><span>Two</span></Flex>
 */
const Flex: FlexComponent = <Element extends ElementType = 'div'>({
    inline,
    gap = 0,
    className,
    ...props
}: FlexProps<Element> & Readonly<{ as?: Element }>): ReactElement => {
    return createElement(
        props.as ?? 'div',
        resolveBoxProps({
            gap,
            className: cn(FLEX_STYLES.recipe({ inline }), className),
            ...props,
        }),
    )
}

export default Flex
