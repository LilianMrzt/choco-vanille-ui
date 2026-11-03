import type { ReactElement } from 'react'

import { Flex } from '@components/layout/flex'
import { Typography } from '@components/foundation/typography'
import { vars } from '@theme'
import { REFERENCE_PAGE_STYLES } from '@stories/_shared/components/reference-page/ReferencePage.css'
import type { ReferencePageProps } from '@stories/_shared/components/reference-page/types'

/**
 * Frames reference stories with a responsive, theme-aware reading surface.
 * @internal Not part of the public package API.
 * @param props - Page heading, concise introduction, and reference content.
 * @returns A semantic main region with a constrained reading width.
 * @example <ReferencePage title="Tokens" description="Shared scales.">...</ReferencePage>
 */
const ReferencePage = ({ title, description, children }: ReferencePageProps): ReactElement => (
    <Flex
        as={'main'}
        backgroundColor={vars.color.background}
        className={REFERENCE_PAGE_STYLES.root}
        color={vars.color.text.primary}
        flexDirection={'column'}
        minHeight={'100dvh'}
    >
        <Flex
            className={REFERENCE_PAGE_STYLES.content}
            flexDirection={'column'}
            gap={32}
        >
            <Flex
                as={'header'}
                flexDirection={'column'}
                gap={8}
            >
                <Typography
                    color={vars.color.primary.subtleForeground}
                    fontSize={14}
                    fontWeight={'semibold'}
                >
                    {'Choco Vanille / Reference'}
                </Typography>
                <Typography variant={'h1'}>{title}</Typography>
                <Typography
                    color={vars.color.text.secondary}
                    maxWidth={'65ch'}
                >
                    {description}
                </Typography>
            </Flex>
            {children}
        </Flex>
    </Flex>
)

export default ReferencePage
