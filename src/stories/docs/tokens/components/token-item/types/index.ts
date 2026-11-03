import type { TokenCategory } from '@stories/docs/tokens/types'

export type TokenItemProps = Readonly<{
    category: TokenCategory
    name: string
    value: string
}>
