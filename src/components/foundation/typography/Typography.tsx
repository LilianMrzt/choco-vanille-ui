import { createElement, type ElementType, type ReactElement } from 'react'

import type {
    TypographyComponent,
    TypographyProps,
} from '@components/foundation/typography/types'
import { resolveTypographyProps } from '@components/foundation/typography/utils/resolveTypographyProps.utils'

/**
 * Renders semantic text without a wrapper. Variant chooses the visual preset
 * and default element; as overrides the element and determines attributes and
 * ref. A recognized as value also selects its preset when variant is absent.
 * Defaults to span. Supports Box layout props and CSS color values.
 * Consumer style wins. Constrain width for ellipsis; maxLines takes precedence.
 * Preserve heading hierarchy, associate labels with controls, and provide
 * another way to read essential clipped text.
 * @template Element - Element selected by as.
 * @param props - Typography, layout and native or custom attributes.
 * @returns The selected semantic text element.
 * @throws When a variant, token, CSS value or line limit is invalid.
 * @example
 * <Typography variant="label" htmlFor="name">Name</Typography>
 */
const Typography: TypographyComponent = <Element extends ElementType = 'span'>(
    props: TypographyProps<Element>,
): ReactElement => {
    const resolved = resolveTypographyProps(props)

    return createElement(props.as ?? resolved.variant, resolved.props)
}

export default Typography
