import type { ReactElement } from 'react'

import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { vars } from '@theme'
import ColorSwatch from '@stories/docs/colors/components/color-swatch/ColorSwatch.tsx'
import type { ColorGroupCardProps } from '@stories/docs/colors/components/color-group-card/types'
import { COLOR_GROUP_CARD_STYLES } from '@stories/docs/colors/components/color-group-card/ColorGroupCard.css'

/**
 * Groups color roles on the current theme's surface.
 * @internal Not part of the public package API.
 * @param props - Semantic family and resolved color values.
 * @returns A family heading and copyable swatches.
 * @example <ColorGroupCard group={group} colors={colors} />
 */
const ColorGroupCard = ({ group, colors }: ColorGroupCardProps): ReactElement => (
    <Flex
        as={'section'}
        backgroundColor={vars.color.surface.main}
        borderColor={vars.color.border.subtle}
        borderRadius={10}
        borderStyle={'solid'}
        borderWidth={'1px'}
        flexDirection={'column'}
        gap={12}
        minWidth={0}
        padding={12}
    >
        <Flex
            flexDirection={'column'}
            gap={4}
        >
            <Typography variant={'h2'}>{group.label}</Typography>
            {group.description && (
                <Typography
                    color={vars.color.text.secondary}
                    fontSize={14}
                >
                    {group.description}
                </Typography>
            )}
        </Flex>
        <div className={COLOR_GROUP_CARD_STYLES.swatches}>
            {group.tokens.map((token) => (
                <ColorSwatch
                    key={token}
                    name={token}
                    value={colors[token]}
                />
            ))}
        </div>
    </Flex>
)

export default ColorGroupCard
