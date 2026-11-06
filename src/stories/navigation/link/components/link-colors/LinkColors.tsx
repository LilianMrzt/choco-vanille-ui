import type { ReactElement } from 'react'

import { Grid } from '@components/layout/grid'
import { Link } from '@components/navigation/link'

/**
 * Displays representative link colors.
 * @internal Storybook-only component; not part of the public package API.
 * @returns The color examples.
 * @example
 * <LinkColors />
 */
const LinkColors = (): ReactElement => (
    <Grid gap={8}>
        <Link
            color={'primary.main'}
            label={'Primary'}
        />
        <Link
            color={'secondary.main'}
            label={'Secondary'}
        />
        <Link
            color={'neutral.main'}
            label={'Tertiary'}
        />
        <Link
            color={'danger.main'}
            label={'Destructive'}
        />
        <Link
            color={'success.main'}
            label={'Success'}
        />
        <Link
            color={'warning.main'}
            label={'Warning'}
        />
        <Link
            color={'info.main'}
            label={'Info'}
        />
    </Grid>
)

export default LinkColors
