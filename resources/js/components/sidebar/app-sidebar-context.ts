import { NavItem } from '@/types';
import * as React from 'react';
// import {  SideBarItemsContext } from '@/components/sidebar/app-sidebar';

export type SideBarItemsContextType = {
    mainNavItems?: NavItem[];
    navGroups?: { navItems: NavItem[]; title: string }[];
    footerNavItems?: NavItem[];
};
export const SideBarItemsContext =
    React.createContext<SideBarItemsContextType | null>(null);

export const useSidebarItems = () => {
    // function useSidebar() {
    const context = React.useContext(SideBarItemsContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.');
    }

    return context;
    // }
};
