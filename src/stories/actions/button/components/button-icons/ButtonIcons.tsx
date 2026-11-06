import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Flex } from '@components/layout/flex'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'
import TrashIcon from '@resources/asset/TrashIcon.svg?react'
import UploadIcon from '@resources/asset/UploadIcon.svg?react'

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
            color={'destructive'}
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
