import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { SIZES, VARIANTS } from '@stories/data-display/avatar/constants'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-variants-source/sources/createAvatarVariantsSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/avatar/utils/create-avatar-variants-source/sources/AvatarVariant.source.tsx.txt?raw'

/**
 * Generates consumer JSX for all treatments at each avatar size.
 * @internal Not part of the public package API.
 * @returns A consumer example matching the size comparison.
 * @example
 * createAvatarVariantsSource()
 */
export const createAvatarVariantsSource = (): string => {
    const rows = VARIANTS.map((variant) => {
        const items = SIZES.map((size) => '            ' + renderSource(itemTemplate, {
            label: JSON.stringify(`Jane Doe, ${variant}, ${size}`),
            size: JSON.stringify(size),
            variant: JSON.stringify(variant),
        })).join('\n')

        return `    <Flex flexDirection="column" gap={8}>\n        <Typography as="span">${variant}</Typography>\n        <Flex alignItems="center" flexWrap="wrap" gap={12}>\n${items}\n        </Flex>\n    </Flex>`
    }).join('\n')

    return renderSource(sourceTemplate, { rows })
}
