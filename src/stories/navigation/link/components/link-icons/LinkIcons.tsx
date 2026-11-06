import type { ReactElement } from 'react'

import { Grid } from '@components/layout/grid'
import { Link } from '@components/navigation/link'
import ChevronLeftIcon from '@resources/asset/ChevronLeftIcon.svg?react'
import ChevronRightIcon from '@resources/asset/ChevronRightIcon.svg?react'

/**
 * Displays links with leading and trailing icons.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The icon examples.
 * @example
 * <LinkIcons />
 */
const LinkIcons = (): ReactElement => (
    <Grid gap={8}>
        <Link
            label={'Start icon'}
            startIcon={ChevronLeftIcon}
        />
        <Link
            endIcon={ChevronRightIcon}
            label={'End icon'}
        />
        <Link
            endIcon={ChevronRightIcon}
            label={'Both icons'}
            startIcon={ChevronLeftIcon}
        />
    </Grid>
)

export default LinkIcons
