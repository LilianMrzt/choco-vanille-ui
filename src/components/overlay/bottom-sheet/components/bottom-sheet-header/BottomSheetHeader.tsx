import { vars } from '@theme/styles/contract/contract.css.ts'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { Flex } from '@components/layout/flex'
import type { BottomSheetHeaderProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-header/types/BottomSheetHeader.props.ts'

/**
 * Title and optional description of a `BottomSheet`.
 * The title labels the sheet and the description describes it.
 */
const BottomSheetHeader: FC<BottomSheetHeaderProps> = memo(({
    title,
    titleAs = 'h2',
    description,
    ...props
}) => (
    <Flex
        flexDirection={'column'}
        gap={'xxs'}
        paddingX={'md'}
        paddingTop={'xs'}
        paddingBottom={'sm'}
        {...props}
    >
        <BaseDrawer.Title
            render={(
                <Typography
                    as={titleAs}
                    fontSize={'lg'}
                    fontWeight={'semibold'}
                    color={vars.color.text.primary}
                    margin={'none'}
                />
            )}
        >
            {title}
        </BaseDrawer.Title>
        {description && (
            <BaseDrawer.Description
                render={(
                    <Typography
                        as={'p'}
                        fontSize={'sm'}
                        color={vars.color.surface.mutedForeground}
                        margin={'none'}
                    />
                )}
            >
                {description}
            </BaseDrawer.Description>
        )}
    </Flex>
))

BottomSheetHeader.displayName = 'BottomSheet.Header'

export default BottomSheetHeader
