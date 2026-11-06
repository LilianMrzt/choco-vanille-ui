import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'
import { COLORS, VARIANTS } from '@stories/data-display/avatar/constants'
import sourceTemplate from '@stories/data-display/avatar/utils/create-avatar-colors-source/sources/createAvatarColorsSource.source.tsx.txt?raw'
import itemTemplate from '@stories/data-display/avatar/utils/create-avatar-colors-source/sources/AvatarColor.source.tsx.txt?raw'

/**
 * Generates all four treatments for every avatar color.
 * @internal Not part of the public package API.
 * @returns A consumer example matching the color comparison.
 * @example
 * createAvatarColorsSource()
 */
export const createAvatarColorsSource = (): string => {
    const avatars = VARIANTS.map((variant) => {
        const items = COLORS.map((color) => '            ' + renderSource(itemTemplate, {
            label: JSON.stringify(`Jane Doe, ${variant}, ${color}`),
            color: JSON.stringify(color),
            variant: JSON.stringify(variant),
        })).join('\n')

        return `    <Flex flexDirection="column" gap={8}>\n        <Typography as="span">${variant}</Typography>\n        <Flex flexWrap="wrap" gap={12}>\n${items}\n        </Flex>\n    </Flex>`
    }).join('\n')

    return renderSource(sourceTemplate, { avatars })
}
