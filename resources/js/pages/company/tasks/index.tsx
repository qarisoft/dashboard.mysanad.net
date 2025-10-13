// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DataTable } from '@/components/table/data-table';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { PaginatedData, Task } from '@/types/data';
import { Form, Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

import TasksController from '@/actions/App/Http/Controllers/Company/TasksController';
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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    page_data,
}: {
    page_data: PaginatedData<Task>;
}) {
    console.log(page_data);
    const { t } = useLang();
    const cols: ColumnDef<Task>[] = [
        {
            accessorKey: 'code',
            header: () => <div className={''}>{t('Code')}</div>,
            cell: ({ row }) => <div className=" ">{row.getValue('code')}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'city',
            header: t('City'),
            cell: ({ row }) => (
                <div className=" ">{row.original.city?.name ?? 'null'}</div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'customer',
            header: t('Customer'),
            cell: ({ row }) => <div>{row.original.customer.name}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'status',
            header: t('Status'),
            cell: ({ row }) => {
                const status = row.original.status;
                return (
                    <div
                        style={{ backgroundColor: row.original.status.color }}
                        className=""
                    >
                        <span>{status.name}</span>
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'is_published',
            header: t('is_published'),
            cell: ({ row }) => {
                // const status = row.original.status;
                // const publish = company.tasks.publish
                // const publish = () => router.post(route('tasks.publish', row.original.id), { is_published: !row.original.is_published });
                return (
                    <Dialog>
                        <DialogTrigger className={'bg-transparent'} asChild>
                            <div className="text-center" dir={'ltr'}>
                                <Switch
                                    className={'cursor-pointer'}
                                    checked={row.original.is_published}
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <Form
                                {...TasksController.publish.form(
                                    row.original.id,
                                )}
                            >
                                <Input
                                    type={'checkbox'}
                                    className={'hidden'}
                                    name={'is_published'}
                                    checked={!row.original.is_published}
                                />

                                <DialogHeader
                                    className={
                                        'flex items-center justify-center'
                                    }
                                >
                                    <DialogTitle>
                                        {t('Publish Task')}
                                    </DialogTitle>
                                    <DialogDescription>
                                        {t(
                                            'Are you sure you want to publish tasks for this task?',
                                        )}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center space-x-2"></div>
                                <DialogFooter className="sm:justify-start">
                                    <Button type="button" variant="default">
                                        {row.original.is_published
                                            ? t('dePublish')
                                            : t('Publish')}
                                    </Button>
                                    <DialogClose asChild>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                        >
                                            {t('Close')}
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </Form>
                        </DialogContent>
                    </Dialog>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'must_to_at',
            header: t('must_do_at'),
            cell: ({ row }) => {
                const a = new Date(row.original.must_do_at);
                return (
                    <div className="">
                        <div dir="ltr" className="text-center">
                            {a.getHours()} : {a.getMinutes()}
                        </div>
                        <div className="text-center">{a.toDateString()}</div>
                    </div>
                );
            },
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'address',
            header: t('address'),
            cell: ({ row }) => <div className="">{row.original.address}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'viewer',
            header: t('viewer'),
            cell: ({ row }) => (
                <div className=" ">{row.original.viewer?.name ?? 'null'}</div>
            ),
            enableSorting: false,
            enableHiding: false,
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
