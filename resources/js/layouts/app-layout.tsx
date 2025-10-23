import { SideBarItemsContext } from '@/components/sidebar/app-sidebar-context';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import company from '@/routes/company';
import { edit } from '@/routes/profile';
import { type BreadcrumbItem, type NavItem } from '@/types';
// import { Home, LayoutGrid, LogOutIcon, SettingsIcon,MapPinIcon,BadgeInfoIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { logout } from '@/routes';
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
    Cog6ToothIcon,
    HomeIcon,
    MapPinIcon,
    Squares2X2Icon,
    SquaresPlusIcon,
    UserGroupIcon,
    UsersIcon,

} from '@heroicons/react/24/solid';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: company.dashboard.index().url,
        icon: HomeIcon,
    },
    {
        title: 'Tasks',
        href: company.tasks.index().url,
        icon: Squares2X2Icon,
    },
    {
        title: 'Tanseeq',
        href: company.tanseeq.index().url,
        icon: SquaresPlusIcon,
    },
    {
        title: 'Map',
        href: company.map.index().url,
        icon: MapPinIcon,
    },
];
const usersGroup = {
    title: 'Users',
    navItems: [
        {
            title: 'Customers',
            href: company.customers.index().url,
            icon: UserGroupIcon,
        },
        {
            title: 'Employees',
            href: company.users.index().url,
            icon: UsersIcon,
        },
        {
            title: 'Viewers',
            href: company.viewers.index().url,
            icon: UsersIcon,
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
    {
        title: 'Log out',
        href: logout().url,
        icon: LogOutIcon,
        method: 'post',

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
