import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group'

import ToggleGroupItem from '@components/actions/toggle-group/components/toggle-group-item/ToggleGroupItem.tsx'
import { TOGGLE_GROUP_STYLES } from '@components/actions/toggle-group/styles/ToggleGroup.css.ts'
import type { ToggleGroupCompound } from '@components/actions/toggle-group/types/ToggleGroupCompound.ts'
import type { ToggleGroupProps } from '@components/actions/toggle-group/types/ToggleGroup.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * A coordinated set of toggle buttons.
 *
 * Use `ToggleGroup.Item` for each option. Base UI manages the selected values,
 * roving focus, keyboard navigation, and controlled/uncontrolled behavior.
 * The group selects one item by default; pass `multiple` to allow several
 * selected items.
 *
 * @example
 * ```tsx
 * <ToggleGroup defaultValue={['bold']}>
 *     <ToggleGroup.Item value="bold" label="Bold" />
 *     <ToggleGroup.Item value="italic" label="Italic" />
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = (({ className, orientation = 'horizontal', children, ...props }: ToggleGroupProps) => (
    <BaseToggleGroup
        className={cn(TOGGLE_GROUP_STYLES.recipe({ orientation }), className)}
        orientation={orientation}
        {...props}
    >
        {children}
    </BaseToggleGroup>
)) as ToggleGroupCompound

ToggleGroup.displayName = 'ToggleGroup'
ToggleGroup.Item = ToggleGroupItem

export default ToggleGroup
