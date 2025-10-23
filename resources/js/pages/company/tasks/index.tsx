// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DataTable } from '@/components/table/data-table';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { PaginatedData, Task } from '@/types/data';
import { Form, Head, Link, router } from '@inertiajs/react';
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
import { create, edit } from '@/routes/company/tasks';
import { LoaderCircle } from 'lucide-react';
import { FC } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const Center:FC<{value:string|undefined}> = ({value})=>{
    return (
        <div className={'text-center'} >{value}</div>
    )
}

export default function Dashboard({
    page_data,
}: {
    page_data: PaginatedData<Task>;
}) {
    console.log(page_data);
    const { t } = useLang();
    const cols: ColumnDef<Task>[] = [
        {
            accessorKey: 'task_number',
            header: () => <div className={''}>{t('#')}</div>,
            cell: ({ row }) => <div className=" ">{row.getValue('task_number')}</div>,
        },
        {
            accessorKey: 'city',
            header: t('City'),
            cell: ({ row }) => (
                <Center value={row.original.city?.name}/>
            ),
        },
        {
            accessorKey: 'customer',
            header: t('Customer'),
            cell: ({ row }) => <Center value={row.original.customer.name} />,
        },
        {
            accessorKey: 'status',
            header: t('Status'),
            cell: ({ row }) => {
                const status = row.original.status;
                return (
                    <div
                        style={{ backgroundColor: row.original.status.color }}
                        className="text-center"
                    >
                        <span>{status.name}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: 'is_published',
            header: t('is published'),
            cell: ({ row }) => {
                return (
                    <TaskPublishDialog task = {row.original} />
                );
            },
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
        },
        {
            accessorKey: 'address',
            header: t('address'),
            cell: ({ row }) => <div className="text-center">{row.original.address}</div>,
        },
        {
            accessorKey: 'viewer',
            header: t('viewer'),
            cell: ({ row }) => (
                <div className=" text-center">{row.original.viewer?.name ?? 'null'}</div>
            ),
        },
        {
            accessorKey: 'edit',
            header: '',
            cell: ({ row }) => (
                <div className={'flex  pe-1 justify-end '}>

                <Link href={edit(row.original.id).url} className={'text-xs'} >{t('Edit')}</Link>
                </div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full max-h-[92dvh] flex-1 flex-col gap-4 overflow-auto overflow-x-auto rounded-xl pt-2">
                <DataTable data={page_data.data} columns={cols} onCreate={()=>router.get(create())} />
            </div>
        </AppLayout>
    );
}




const  TaskPublishDialog:FC<{task:Task}> = ({task})=>{
    const {t}=useLang()
    return (
        <Dialog>
            <DialogTrigger className={'bg-transparent'} asChild>
                <div className="text-center" dir={'ltr'}>
                    <Switch
                        className={'cursor-pointer'}
                        checked={task.is_published}
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <Form
                    {...TasksController.publish.form(
                        task.id,
                    )}
                >
                    {({processing})=>(
                        <>
                            <Input
                                type={'checkbox'}
                                className={'hidden'}
                                name={'is_published'}
                                checked={!task.is_published}
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
                                <Button
                                    disabled={processing}
                                    type="submit" variant="default">
                                    {task.is_published
                                        ? t('dePublish')
                                        : t('Publish')}
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                </Button>
                                <DialogClose
                                    disabled={processing}
                                    asChild>
                                    <Button
                                        disabled={processing}
                                        type="button"
                                        variant="secondary"
                                    >
                                        {t('Close')}
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
