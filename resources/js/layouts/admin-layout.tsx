import { SideBarItemsContext } from '@/components/sidebar/app-sidebar-context';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import admin from '@/routes/admin';
import { edit } from '@/routes/profile';
import { type BreadcrumbItem, type NavItem } from '@/types';
import { LayoutGrid, SettingsIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: admin.dashboard.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Companies',
        href: admin.companies.index(),
        icon: LayoutGrid,
    },
    {
        title: 'Tasks',
        href: admin.tasks.index(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: edit().url,
        icon: SettingsIcon,
    },
];
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <SideBarItemsContext
        value={{
            mainNavItems,
            footerNavItems,
        }}
    >
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    </SideBarItemsContext>
);
