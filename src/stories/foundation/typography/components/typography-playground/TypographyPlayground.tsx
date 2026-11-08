import type { FC } from 'react'

import { Typography } from '@components/foundation/typography'
import type { TypographyStoryArgs } from '@stories/foundation/typography/types'

/**
 * @internal Native typography playground, not part of the public package API.
 * Associates htmlFor only with a rendered label.
 * @param props - Editable native and visual arguments.
 * @param props.as - Optional semantic override.
 * @param props.variant - Visual preset and default semantic element.
 * @param props.htmlFor - Control associated with a label.
 * @returns The configured text element.
 * @example
 * <TypographyPlayground variant="label" htmlFor="name">Name</TypographyPlayground>
 */
const TypographyPlayground: FC<TypographyStoryArgs> = ({
    as,
    variant,
    htmlFor,
    ...props
}) => {
    const element = as ?? variant ?? 'span'

    if (element === 'label') {
        return (
            <Typography
                as={'label'}
                variant={variant}
                htmlFor={htmlFor}
                {...props}
            />
        )
    }

    return (
        <Typography
            as={element}
            variant={variant}
            {...props}
        />
    )
}

export default TypographyPlayground
