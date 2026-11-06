import { Avatar } from '@components/data-display/avatar'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { SIZES, VARIANTS } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'

const AvatarVariants = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={12}
    >
        {VARIANTS.map((variant) => (
            <Flex
                flexDirection={'column'}
                gap={8}
                key={variant}
            >
                <Typography as={'span'}>{variant}</Typography>
                <Flex
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    gap={12}
                >
                    {SIZES.map((size) => (
                        <Avatar
                            aria-label={`Jane Doe, ${variant}, ${size}`}
                            initials={'JD'}
                            key={size}
                            size={size}
                            variant={variant}
                        />
                    ))}
                </Flex>
            </Flex>
        ))}
    </Flex>
)

export default AvatarVariants
