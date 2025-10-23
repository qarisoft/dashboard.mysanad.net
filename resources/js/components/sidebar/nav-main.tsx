import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useLang } from '@/hooks/use-lang';
import { cn } from '@/lib/utils';

export function NavMain({ items = [], title = 'Platform' }: { items: NavItem[], title?: string }) {
    const page = usePage();
    const { t } = useLang()
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{t(title)}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = page.url.startsWith(
                        typeof item.href === 'string'
                            ? item.href
                            : item.href.url,
                    )

                    console.log(page.url);

                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={isActive}
                                tooltip={{ children: item.title }}
                                size={'xl2'}
                                className={'rounded-xl'}
                            >
                                <Link href={item.href} prefetch className="ps-4 text-xs [data-state=collapsed]_&]:ps-0">
                                    {/*{item.icon && <item.icon  className={cn(['h-[11px]'])} color={isActive ? 'white' : '#008EFF'}  />}*/}
                                    <div className={cn(['rounded-[11px] p-[7px] shadow  w-fit', isActive ? 'bg-[#008EFF]' : 'bg-white'])}>
                                        {item.icon && <item.icon className={cn(['h-[11px] w-fit'])} color={isActive ? 'white' : '#008EFF'} />}
                                    </div>
                                    <span>{t(item.title)}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
