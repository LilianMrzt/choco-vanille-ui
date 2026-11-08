import { CHECK_ICON as CheckIcon, CHEVRON_RIGHT_ICON as ChevronRightIcon } from '@constants/icon-registry'
import { Badge } from '@components/data-display/badge'
import { Flex } from '@components/layout/flex'
import { type ReactElement } from 'react'

const BadgeWithIcons = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        <Badge
            color={'success'}
            label={'Start icon'}
            startIcon={CheckIcon}
        />
        <Badge
            color={'primary'}
            endIcon={ChevronRightIcon}
            label={'End icon'}
            variant={'outlined'}
        />
        <Badge
            color={'info'}
            endIcon={ChevronRightIcon}
            label={'Both icons'}
            startIcon={CheckIcon}
            variant={'contained'}
        />
    </Flex>
)

export default BadgeWithIcons
