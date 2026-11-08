import { CHEVRON_RIGHT_ICON as ChevronRightIcon, TRASH_ICON as TrashIcon, UPLOAD_ICON as UploadIcon } from '@constants/icon-registry'
import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'

/**
 * Shows leading and trailing decorative icons.
 * @internal Storybook-only component; not part of the public package API.
 * @returns Icon examples.
 * @example
 * <ButtonIcons />
 */
const ButtonIcons = (): ReactElement => (
    <Flex
        alignItems={'center'}
        flexWrap={'wrap'}
        gap={12}
    >
        <Button
            color={'danger'}
            label={'Delete'}
            startIcon={TrashIcon}
            variant={'outlined'}
        />
        <Button
            endIcon={ChevronRightIcon}
            label={'Next'}
        />
        <Button
            color={'primary'}
            endIcon={ChevronRightIcon}
            label={'Upload'}
            startIcon={UploadIcon}
        />
    </Flex>
)

export default ButtonIcons
