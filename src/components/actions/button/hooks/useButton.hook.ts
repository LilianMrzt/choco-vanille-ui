import { Slot } from '@radix-ui/react-slot'

import { buttonVariants } from '@components/actions/button/Button.styles.ts'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { mergeClassNames } from '@/utils/mergeClassNames.ts'

export const useButton = ({
    asChild,
    variant,
    size,
    className,
}: Partial<Pick<ButtonProps, 'asChild' | 'variant' | 'size' | 'className'>>) => {
    const element = asChild ? Slot : 'button'

    const resolvedClassName = mergeClassNames(
        buttonVariants({ variant, size }),
        className,
    )

    return { element, resolvedClassName }
}
