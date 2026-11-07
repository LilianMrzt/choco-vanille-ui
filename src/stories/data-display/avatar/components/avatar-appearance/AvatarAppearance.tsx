import { Avatar } from '@components/data-display/avatar'
import { COLORS, VARIANTS } from '@stories/data-display/avatar/constants'
import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import AvatarShapes from '@stories/data-display/avatar/components/avatar-shapes/AvatarShapes'

/**
 * Compares every treatment in every semantic color, independently of sizes.
 * @internal Not part of the public package API.
 * @returns Labelled comparison sections.
 * @example <AvatarAppearance />
 */
const AvatarAppearance = (): ReactElement => (
    <Flex
        flexDirection={'column'}
        gap={24}
        maxWidth={'100%'}
        width={'min(40rem, calc(100vw - 32px))'}
    >
        <section>
            <Typography as={'h3'}>Variants / Colors</Typography>
            <Flex
                flexDirection={'column'}
                gap={16}
            >
                {COLORS.map((color) => (
                    <Flex
                        flexDirection={'column'}
                        gap={8}
                        key={color}
                        role={'group'}
                        aria-label={color}
                    >
                        <Typography as={'h4'}>{color}</Typography>
                        <Flex
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            gap={12}
                        >
                            {VARIANTS.map((variant) => (
                                <Avatar
                                    aria-label={`Jane Doe, ${color}, ${variant}`}
                                    color={color}
                                    initials={'JD'}
                                    key={variant}
                                    variant={variant}
                                />
                            ))}
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </section>
        <section>
            <Typography as={'h3'}>Shapes</Typography>
            <AvatarShapes />
        </section>
    </Flex>
)

export default AvatarAppearance
