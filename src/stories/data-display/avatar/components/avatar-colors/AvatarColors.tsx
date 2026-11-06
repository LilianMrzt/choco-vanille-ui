import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { COLORS, VARIANTS } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarColors = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={12}
        maxWidth={'30rem'}
    >
        {VARIANTS.map((variant) => (
            <Flex
                flexDirection={'column'}
                gap={8}
                key={variant}
            >
                <Typography as={'span'}>{variant}</Typography>
                <Flex
                    flexWrap={'wrap'}
                    gap={12}
                >
                    {COLORS.map((color) => (
                        <Avatar
                            aria-label={`Jane Doe, ${variant}, ${color}`}
                            color={color}
                            initials={'JD'}
                            key={color}
                            variant={variant}
                        />
                    ))}
                </Flex>
            </Flex>
        ))}
    </Flex>
)

export default AvatarColors
