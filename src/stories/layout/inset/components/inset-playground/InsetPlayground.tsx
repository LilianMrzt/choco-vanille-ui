import {
    Inset,
} from '@components/layout/inset'
import { Card } from '@components/surfaces/card'
import { Typography } from '@components/foundation/typography'
import type { ComponentProps, ReactElement } from 'react'
import { EXAMPLE_IMAGE } from '@stories/_shared/example-image/constants'

/**
 * Renders the Inset Playground story.
 * @internal Not part of the public package API.
 * @param args - Current component props.
 * @returns The example content.
 * @example
 * <InsetPlayground space={16} />
 */
const InsetPlayground = (args: ComponentProps<typeof Inset>): ReactElement => (
    <Card
        padding={16}
    >
        <Inset {...args}>
            <img
                src={EXAMPLE_IMAGE}
                alt={'An abstract circle illustration'}
                style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: '8.75rem',
                    backgroundColor: 'var(--color-surface-muted)',
                }}
            />
        </Inset>
        <Typography variant={'p'}>
            Supporting text below the bleeding content.
        </Typography>
    </Card>
)

export default InsetPlayground
