import CompaniesCreationRequests from '@/actions/App/Http/Controllers/Admin/CompaniesCreationRequests';
import { DataTable } from '@/components/table/data-table';
import { Cell, TH } from '@/components/table/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useLang } from '@/hooks/use-lang';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes';
import { User, type BreadcrumbItem } from '@/types';
import { PaginatedData } from '@/types/data';
import { Form, Head } from '@inertiajs/react';
import { IconTrendingUp } from '@tabler/icons-react';
import { ColumnDef } from '@tanstack/react-table';
import { LoaderCircle } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];


const AcceptCompanyDialog: FC<PropsWithChildren<{ company: Company }>> = ({ company, children }) => {

    const { __ } = useLang()
    return (
        <Dialog>
            <DialogTrigger className={'bg-transpare'} asChild>
                <div className="text-center w-full flex justify-center" dir={'ltr'}>
                    {children}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <Form
                    {...CompaniesCreationRequests.update.form(
                        company.id,
                    )}
                >
                    {({ processing }) => (
                        <>
                            <DialogHeader
                                className={
                                    'flex items-center justify-center'
                                }
                            >
                                <DialogTitle>
                                    <Cell v={'Publish Task'} />
                                </DialogTitle>
                                <DialogDescription>

                                    {
                                        __('Are you sure you want to publish tasks for this task?')
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2"></div>
                            <DialogFooter className="sm:justify-start pt-4">
                                <Button
                                    disabled={processing}
                                    type="submit"
                                    variant="default">
                                    {company.is_active
                                        ? __('dePublish')
                                        : __('Publish')}
                                </Button>
                                <DialogClose asChild>
                                    <Button
                                        variant="secondary"
                                    >
                                        {__('Close')}
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}


                </Form>
            </DialogContent>
        </Dialog>
    )
}
type Company = {
    id: number,
    name: string
    avatar_url: string
    user_id: number
    file: string
    is_active: boolean
    created_at: string
    updated_at: string
    owner: User

}

export default function Dashboard({ page_data }: { page_data: PaginatedData<Company> }) {
    console.log(page_data);
    const { __ } = useLang();
    const cols: ColumnDef<Company>[] = [
        {
            accessorKey: 'name',
            header: () => <TH v={'Name'} />,
            cell: ({ row }) => <TableCellViewer item={row.original} />,
        },
        {
            accessorKey: 'username',
            header: () => <TH v={'UserName'} />,
            cell: ({ row }) => <Cell v={row.original.owner?.username} />,
        },
        {
            accessorKey: 'email',
            header: () => <TH v={'Email'} />,
            cell: ({ row }) => <Cell v={row.original.owner?.email} />,
        },
        {
            accessorKey: 'is_active',
            header: '',
            cell: ({ row }) => <AcceptCompanyDialog company={row.original} >
                <Button

                >accept</Button>
            </AcceptCompanyDialog>,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DataTable data={page_data.data} columns={cols} />

            </div>
        </AppLayout>
    );
}


function TableCellViewer({ item }: { item: Company }) {
    const isMobile = useIsMobile()
    return (
        <Drawer direction={isMobile ? "bottom" : "left"}   >
            <DrawerTrigger asChild>
                <Button variant="link" className="text-foreground">
                    {item.name}
                </Button>
            </DrawerTrigger>

            <DrawerContent className='max-w-[500px]! '>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>{item.name}</DrawerTitle>
                    <DrawerDescription>
                        Showing total visitors for the last 6 months
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="header">Header</Label>
                            <div className="">{item.owner.name}</div>
                            {/* <Input id="header" defaultValue={item.owner.name} /> */}
                        </div>
                        <Separator />

                        <div className="p-2">Owner</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="type">email</Label>
                                <div className="">{item.owner.email}</div>

                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="status">Username</Label>
                                <div className="">{item.owner.username}</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="target">Created at</Label>
                                <div className="">{item.owner.created_at}</div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Label htmlFor="limit">Limit</Label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="reviewer">File</Label>
                            <div className="">{item.file}</div>
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <AcceptCompanyDialog company={item} >
                        <Button className='flex-1 '
                        >accept</Button>
                        {/* <div className="bg-red-50">dsadsa</div> */}
                    </AcceptCompanyDialog>

                    <DrawerClose asChild>
                        <Button variant="outline">Done</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>



        </Drawer>
    )
}




