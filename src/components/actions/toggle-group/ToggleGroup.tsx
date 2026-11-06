import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'

import ToggleGroupItem from '@components/actions/toggle-group/components/toggle-group-item/ToggleGroupItem.tsx'
import { TOGGLE_GROUP_STYLES } from '@components/actions/toggle-group/ToggleGroup.css.ts'
import type { ToggleGroupCompound, ToggleGroupProps } from '@components/actions/toggle-group/types'
import { cn } from '@utils/cn.ts'

const ToggleGroupRoot = <Value extends string,>({
    className,
    orientation = 'horizontal',
    children,
    ...props
}: ToggleGroupProps<Value>) => {
    return (
        <BaseToggleGroup
            className={cn(TOGGLE_GROUP_STYLES.recipe({ orientation }), className)}
            orientation={orientation}
            {...props}
        >
            {children}
        </BaseToggleGroup>
    )
}

/**
 * A coordinated set of toggle buttons with a unique value for each item.
 * Base UI manages selection and roving focus; use `multiple` for multi-select.
 * Name the group accessibly and pass a ref to access its div.
 *
 * @example
 * <ToggleGroup aria-label="Text style" defaultValue={['bold']}>
 *     <ToggleGroup.Item value="bold" label="Bold" />
 *     <ToggleGroup.Item value="italic" label="Italic" />
 * </ToggleGroup>
 */
const ToggleGroup: ToggleGroupCompound = Object.assign(ToggleGroupRoot, {
    Item: ToggleGroupItem,
})
ToggleGroup.displayName = 'ToggleGroup'

export default ToggleGroup
