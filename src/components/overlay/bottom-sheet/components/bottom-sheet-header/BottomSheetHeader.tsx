import { vars } from '@theme/styles/contract/contract.css.ts'
import { Drawer as BaseDrawer } from '@base-ui/react/drawer'
import { memo, type FC } from 'react'

import { Typography } from '@components/foundation/typography'
import { Flex } from '@components/layout/flex'
import type { BottomSheetHeaderProps } from '@components/overlay/bottom-sheet/components/bottom-sheet-header/types'

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
        gap={2}
        paddingX={12}
        paddingTop={4}
        paddingBottom={8}
        {...props}
    >
        <BaseDrawer.Title
            render={(
                <Typography
                    as={titleAs}
                    fontSize={18}
                    fontWeight={'semibold'}
                    color={vars.color.text.primary}
                    margin={0}
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
                        fontSize={14}
                        color={vars.color.surface.mutedForeground}
                        margin={0}
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
