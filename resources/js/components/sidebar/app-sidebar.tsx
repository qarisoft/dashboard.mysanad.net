import { NavFooter } from '@/components/sidebar/nav-footer';
import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
// import React from 'react';
import { useSidebarItems } from '@/components/sidebar/app-sidebar-context';
import AppLogo from '../layout/app-logo';

export function AppSidebar() {
    const { footerNavItems, mainNavItems, navGroups } = useSidebarItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {mainNavItems && <NavMain items={mainNavItems} />}
                {navGroups && (
                    <>
                        {navGroups.map((g) => (
                            // <SidebarContent key={g.title}>
                                <NavMain items={g.navItems} title={g.title} key={g.title} />
                            // </SidebarContent>
                        ))}
                    </>
                )}
            </SidebarContent>
            {footerNavItems && (
                <SidebarFooter>
                    <NavFooter items={footerNavItems} className="mt-auto" />
                    <NavUser />
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
