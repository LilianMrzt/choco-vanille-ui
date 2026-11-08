import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type { DrawerCollapsibleProps } from '@components/overlay/drawer/components/items/drawer-collapsible/types'

export type UseDrawerCollapsibleOptions = Pick<
    DrawerCollapsibleProps,
    'defaultExpanded' | 'expanded' | 'onExpandedChange' | 'disabled'
>

export type UseDrawerCollapsibleReturn = {
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
