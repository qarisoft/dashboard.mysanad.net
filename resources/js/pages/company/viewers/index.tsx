import ViewersController from '@/actions/App/Http/Controllers/Company/ViewersController';
import { DataTable } from '@/components/table/data-table';
import { Cell, TH } from '@/components/table/utils';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, User } from '@/types';
import { PaginatedData, WithTimeStamp } from '@/types/data';
import { Form, Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Trash, Trash2 } from 'lucide-react';
// import Viewers from '@/routes/company/viewers';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Viewers',
        href: dashboard().url,
    },
];
type Viewer = WithTimeStamp<{
    id: number;
    user: User;
    is_active: boolean;
    user_id: number;
}>;
export default function Dashboard({
    page_data,
}: {
    page_data: PaginatedData<Viewer>;
}) {
    const { __ } = useLang();
    const cols: ColumnDef<Viewer>[] = [
        {
            accessorKey: 'name',
            header: () => <TH v={'Name'} />,
            cell: ({ row }) => <Cell v={row.original.user?.name} />,
        },
        {
            accessorKey: 'username',
            header: () => <TH v={'UserName'} />,
            cell: ({ row }) => <Cell v={row.original.user?.username} />,
        },
        {
            accessorKey: 'email',
            header: () => <TH v={'Email'} />,
            cell: ({ row }) => <Cell v={row.original.user?.email} />,
        },
        {
            accessorKey: 'is_active',
            header: () => <TH v={'Is_active'} />,
            cell: ({ row }) => {
                return (
                    <Dialog>
                        <DialogTrigger className={'bg-transparent'} asChild>
                            <div className="text-center" dir={'ltr'}>
                                <Switch
                                    className={'cursor-pointer'}
                                    checked={row.original.is_active}
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <Form
                                {...ViewersController.activate.form(
                                    row.original.id,
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
                                                {__(
                                                    'Are you sure you want to publish tasks for this task?',
                                                )}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center space-x-2"></div>
                                        <DialogFooter className="pt-4 sm:justify-start">
                                            <Button
                                                disabled={processing}
                                                type="submit"
                                                variant="default"
                                            >
                                                {row.original.is_active
                                                    ? __('dePublish')
                                                    : __('Publish')}
                                            </Button>
                                            <DialogClose asChild>
                                                <Button variant="secondary">
                                                    {__('Close')}
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                );
            },
        },
        {
            accessorKey: 'delete',
            header: () => <TH v={''} />,
            cell: ({ row }) => {
                return (
                    <Dialog>
                        <DialogTrigger className={'bg-transparent'} asChild>
                            <div className="text-center   flex justify-center" dir={''}>
                                <Trash2 className={'text-destructive hover:cursor-pointer'} size={16}/>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <Form
                                {...ViewersController.destroy.form(
                                    row.original.id,
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
                                                {__(
                                                    'Are you sure you want to publish tasks for this task?',
                                                )}
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center space-x-2"></div>
                                        <DialogFooter className="pt-4 sm:justify-start">
                                            <Button
                                                disabled={processing}
                                                type="submit"
                                                variant="destructive"
                                            >
                                                {__('delete')}
                                            </Button>
                                            <DialogClose asChild>
                                                <Button variant="secondary" >
                                                    {__('Close')}
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                );
            },
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl pt-2 max-h-[92dvh] overflow-auto">
                <DataTable data={page_data.data} columns={cols} />
            </div>
        </AppLayout>
    );
}
