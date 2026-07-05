import { createContext, useContext } from 'react'

export type TabsVariant = 'default' | 'pills';

export type TabsVariantContextValue = {
  variant: TabsVariant;
};

export const TabsVariantContext = createContext<TabsVariantContextValue>({
    variant: 'default',
})

export const useTabsVariant = (): TabsVariantContextValue =>
    useContext(TabsVariantContext)
