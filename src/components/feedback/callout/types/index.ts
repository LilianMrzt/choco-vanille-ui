import type { FC } from 'react'

import type CalloutDescription from '@components/feedback/callout/components/callout-description/CalloutDescription.tsx'
import type CalloutIcon from '@components/feedback/callout/components/callout-icon/CalloutIcon.tsx'
import type CalloutTitle from '@components/feedback/callout/components/callout-title/CalloutTitle.tsx'
import type { CalloutProps } from '@components/feedback/callout/types/Callout.props.ts'

export type CalloutCompound = FC<CalloutProps> & {
    Icon: typeof CalloutIcon
    Title: typeof CalloutTitle
    Description: typeof CalloutDescription
}
