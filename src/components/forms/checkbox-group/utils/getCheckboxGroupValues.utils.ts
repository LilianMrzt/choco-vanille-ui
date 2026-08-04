import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'

type CheckboxValueProps = {
    value: string
}

const hasCheckboxValue = (child: ReactNode): child is ReactElement<CheckboxValueProps> =>
    isValidElement<CheckboxValueProps>(child) && typeof child.props.value === 'string'

export const getCheckboxGroupValues = (children: ReactNode): string[] => {
    const values = Children.toArray(children)
        .filter(hasCheckboxValue)
        .map((child) => child.props.value)

    return [...new Set(values)]
}
