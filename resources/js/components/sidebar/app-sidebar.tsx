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
import { SanadSVG } from '../layout/app-logo';

export function AppSidebar() {
    const { footerNavItems, mainNavItems, navGroups } = useSidebarItems();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                {/*<SanadSVG />*/}
                                <div className="flex gap-1">
                                    <AppLogo />
                                </div>
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

export  function AppLogo() {
    // const { rtl } = useRtl();
    return (
        <>
            {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div> */}
            <div className="">
                <SanadSVG size={30} />
            </div>
            <SanadLogo />
            {/* <div className="ml-1 grid flex-1 text-start text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold"></span>
            </div> */}
        </>
    );
}

const SanadLogo = () => (
    <div className="flex gap-2">
        <h1 className="my-auto text-[18px] font-bold">
            SANAD <span className="mx-0">|</span> سًنًد
        </h1>
    </div>
);
