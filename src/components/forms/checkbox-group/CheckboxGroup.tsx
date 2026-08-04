import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group'
import { memo, useCallback, useState } from 'react'

import Checkbox from '@components/forms/checkbox/Checkbox.tsx'
import CheckboxGroupHeader from '@components/forms/checkbox-group/components/header/CheckboxGroupHeader.tsx'
import { CheckboxGroupProvider } from '@components/forms/checkbox-group/context/CheckboxGroup.context.ts'
import type { CheckboxGroupCompound } from '@components/forms/checkbox-group/types/CheckboxGroupCompound.ts'
import type { CheckboxGroupProps } from '@components/forms/checkbox-group/types/CheckboxGroup.props.ts'
import { getCheckboxGroupValues } from '@components/forms/checkbox-group/utils/getCheckboxGroupValues.utils.ts'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'

/**
 * The root container for a group of `CheckboxGroup.Item` components.
 * Manages the selection state for multiple checkboxes.
 *
 * @example
 * ```tsx
 * <CheckboxGroup value={values} onValueChange={setValues}>
 *   <CheckboxGroup.Item value="email" label="Email" />
 *   <CheckboxGroup.Item value="sms" label="SMS" />
 * </CheckboxGroup>
 *
 * `allValues` is inferred from direct `CheckboxGroup.Item` children. Provide it
 * explicitly only when the values are rendered indirectly or need an override.
 * ```
 */
const CheckboxGroup = memo<CheckboxGroupProps>(({
    className,
    children,
    value,
    defaultValue,
    allValues,
    onValueChange,
    ...props
}) => {
    const resolvedAllValues = allValues ?? getCheckboxGroupValues(children)
    const [internalValue, setInternalValue] = useState(defaultValue ?? [])
    const currentValue = value ?? internalValue
    const handleValueChange = useCallback(
        (...args: Parameters<NonNullable<CheckboxGroupProps['onValueChange']>>) => {
            if (value === undefined) {
                setInternalValue(args[0])
            }
            onValueChange?.(...args)
        },
        [onValueChange, value],
    )

    return (
        <BaseCheckboxGroup
            className={cn(className)}
            onValueChange={handleValueChange}
            value={currentValue}
            allValues={resolvedAllValues}
            {...props}
        >
            <CheckboxGroupProvider value={{ value: currentValue, allValues: resolvedAllValues, onValueChange: handleValueChange }}>
                <Flex
                    flexDirection={'column'}
                    gap={'sm'}
                    alignItems={'start'}
                >
                    {children}
                </Flex>
            </CheckboxGroupProvider>
        </BaseCheckboxGroup>
    )
}) as unknown as CheckboxGroupCompound

CheckboxGroup.displayName = 'CheckboxGroup'
CheckboxGroup.Item = Checkbox
CheckboxGroup.Header = CheckboxGroupHeader

export default CheckboxGroup
