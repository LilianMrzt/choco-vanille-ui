import type { FC } from 'react'

import type CardBody from '@components/layout/card/components/card-body/CardBody.tsx'
import type CardFooter from '@components/layout/card/components/card-footer/CardFooter.tsx'
import type CardHeader from '@components/layout/card/components/card-header/CardHeader.tsx'
import type { CardProps } from '@components/layout/card/types/Card.props.ts'

export type CardCompound = FC<CardProps> & {
    Header: typeof CardHeader
    Body: typeof CardBody
    Footer: typeof CardFooter
}
