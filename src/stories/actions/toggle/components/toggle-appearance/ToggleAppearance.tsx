import { Toggle } from '@components/actions/toggle'
import { COLORS, VARIANTS } from '@stories/actions/toggle/constants'
import type { ReactElement } from 'react'
import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'

/**
 * Compares every treatment in every semantic color, independently of sizes.
 * @internal Not part of the public package API.
 * @returns Labelled comparison sections.
 * @example <ToggleAppearance />
 */
const ToggleAppearance = (): ReactElement => (
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
                                <Toggle
                                    label={variant}
                                    color={color}
                                    key={variant}
                                    variant={variant}
                                    defaultPressed
                                />
                            ))}
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </section>
    </Flex>
)

export default ToggleAppearance
