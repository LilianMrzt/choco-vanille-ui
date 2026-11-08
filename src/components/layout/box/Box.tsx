import { createElement, type ElementType, type ReactElement } from 'react'

import type { BoxComponent, BoxProps } from '@components/layout/box/types'
import { resolveBoxProps } from '@components/layout/box/utils/resolveBoxProps.utils'

/**
 * Renders a layout element without a wrapper, defaulting to div. The selected
 * element determines native or custom attributes and the ref target. Styling
 * props are consumed by Box, including names shared with native attributes.
 * Token values produce classes; free CSS values are inline. Consumer style
 * wins, while className follows the normal CSS cascade.
 * Choose semantic elements and supply accessible names where required.
 * @template Element - Element or component selected by as.
 * @param props - Layout, native and custom attributes for the selected element.
 * @returns The selected layout element.
 * @throws When a styling token or CSS value is invalid.
 * @example
 * <Box as="section" padding={16} width="100%">Content</Box>
 */
const Box: BoxComponent = <Element extends ElementType = 'div'>(
    props: BoxProps<Element>,
): ReactElement => createElement(props.as ?? 'div', resolveBoxProps(props))

export default Box
