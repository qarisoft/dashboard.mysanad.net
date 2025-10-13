import { SideBarItemsContext } from '@/components/sidebar/app-sidebar-context';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import company from '@/routes/company';
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
        href: company.dashboard.index().url,
        icon: LayoutGrid,
    },
    {
        title: 'Tasks',
        href: company.tasks.index().url,
        icon: LayoutGrid,
    },
    {
        title: 'Tanseeq',
        href: company.tanseeq.index().url,
        icon: LayoutGrid,
    },
    {
        title: 'Map',
        href: company.map.index().url,
        icon: LayoutGrid,
    },
];
const usersGroup = {
    title: 'Users',
    navItems: [
        {
            title: 'Customers',
            href: company.customers.index().url,
            icon: LayoutGrid,
        },
        {
            title: 'Employees',
            href: company.users.index().url,
            icon: LayoutGrid,
        },
        {
            title: 'Viewers',
            href: company.viewers.index().url,
            icon: LayoutGrid,
        },
    ],
};

const navGroups = [
    usersGroup
]
const footerNavItems: NavItem[] = [
    {
        title: 'Settings',
        href: edit().url,
        icon: SettingsIcon,
    },
];
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <SideBarItemsContext
        value={{ mainNavItems, footerNavItems, navGroups }}
    >
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    </SideBarItemsContext>
);
