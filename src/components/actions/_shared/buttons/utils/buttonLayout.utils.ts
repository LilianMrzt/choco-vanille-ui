import { BOX_STYLES } from '@components/layout/box/Box.css.ts'
import type { ButtonLayoutProps } from '@components/actions/_shared/buttons/types'

export const getButtonLayoutClassName = ({
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
}: ButtonLayoutProps): string | undefined => {
    if (
        margin === undefined &&
        marginTop === undefined &&
        marginRight === undefined &&
        marginBottom === undefined &&
        marginLeft === undefined
    ) {
        return undefined
    }

    return BOX_STYLES.recipe({ margin, marginTop, marginRight, marginBottom, marginLeft })
}
