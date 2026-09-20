import { BOX_STYLES } from '@components/layout/box/styles/Box.css.ts'
import type { ButtonLayoutProps } from '@components/actions/_shared/buttons/types'

export const getButtonLayoutClassName = ({
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
}: ButtonLayoutProps): string | undefined => {
    if (
        marginTop === undefined &&
        marginRight === undefined &&
        marginBottom === undefined &&
        marginLeft === undefined
    ) {
        return undefined
    }

    return BOX_STYLES.recipe({ marginTop, marginRight, marginBottom, marginLeft })
}
