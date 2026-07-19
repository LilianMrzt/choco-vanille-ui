import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types/DrawerSectionItem.props.ts'

export type UseDrawerSectionItemOptions = Pick<
    DrawerSectionItemProps,
    'defaultExpanded' | 'expanded' | 'onExpandedChange' | 'disabled'
>

export type UseDrawerSectionItemReturn = {
    open: ReturnType<typeof useDrawerItemAttributes>['open'];
    state: ReturnType<typeof useDrawerItemAttributes>['state'];
    resolvedIconSize: ReturnType<
        typeof useDrawerItemAttributes
    >['resolvedIconSize'];
    itemAttributes: ReturnType<typeof useDrawerItemAttributes>['itemAttributes'];
    sectionId: string;
    expanded: boolean;
    handleToggle: () => void;
}
