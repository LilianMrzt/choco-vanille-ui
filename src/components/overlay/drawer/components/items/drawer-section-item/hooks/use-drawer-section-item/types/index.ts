import type { KeyboardEvent } from 'react'

import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared'
import type { DrawerSectionItemProps } from '@components/overlay/drawer/components/items/drawer-section-item/types/DrawerSectionItem.props.ts'

export type UseDrawerSectionItemOptions = Pick<
    DrawerSectionItemProps,
    'defaultExpanded' | 'expanded' | 'onExpandedChange' | 'size' | 'disabled'
>

export type UseDrawerSectionItemReturn = {
    state: ReturnType<typeof useDrawerItemAttributes>['state'];
    resolvedIconSize: ReturnType<
        typeof useDrawerItemAttributes
    >['resolvedIconSize'];
    itemAttributes: ReturnType<typeof useDrawerItemAttributes>['itemAttributes'];
    sectionId: string;
    expanded: boolean;
    handleToggle: () => void;
    handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}
