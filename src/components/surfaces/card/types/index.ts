import type { FC } from 'react'

import type CardBody from '@components/surfaces/card/components/card-body/CardBody.tsx'
import type CardFooter from '@components/surfaces/card/components/card-footer/CardFooter.tsx'
import type CardHeader from '@components/surfaces/card/components/card-header/CardHeader.tsx'
import type { CardProps } from '@components/surfaces/card/types/Card.props.ts'

export type CardCompound = FC<CardProps> & {
    Header: typeof CardHeader
    Body: typeof CardBody
    Footer: typeof CardFooter
}
