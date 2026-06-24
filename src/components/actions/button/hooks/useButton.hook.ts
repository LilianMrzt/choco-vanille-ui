import { buttonVariants } from '@components/actions/button/Button.styles.ts'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { mergeClassNames } from '@/utils/mergeClassNames.ts'

export const useButton = ({
    variant,
    size,
    className,
}: Partial<Pick<ButtonProps, 'variant' | 'size' | 'className'>>) => {
    const resolvedClassName = mergeClassNames(
        buttonVariants({ variant, size }),
        className,
    )

    return { resolvedClassName }
}
