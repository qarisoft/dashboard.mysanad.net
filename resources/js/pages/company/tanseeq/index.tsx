// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DataTable } from '@/components/table/data-table';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { PaginatedData, Task } from '@/types/data';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { show } from '@/routes/company/tanseeq';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Page({
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
        },
        {
            accessorKey: 'city',
            header: t('City'),
            cell: ({ row }) => (
                <div className=" ">{row.original.city?.name ?? 'null'}</div>
            ),
        },
        {
            accessorKey: 'customer',
            header: t('Customer'),
            cell: ({ row }) => <div>{row.original.customer.name}</div>,
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
            accessorKey: 'do',
            header: '',
            cell: ({ row }) => <Link href={show(row.original.id).url} >{t('Do')}</Link>,
        },
        {
            accessorKey: 'address',
            header: t('address'),
            cell: ({ row }) => <div className="">{row.original.address}</div>,
        },
        {
            accessorKey: 'viewer',
            header: t('viewer'),
            cell: ({ row }) => (
                <div className=" ">{row.original.viewer?.name ?? 'null'}</div>
            ),
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full max-h-[92dvh] overflow-auto">
                <div className="flex h-full flex-1 gap-4 overflow-auto rounded-xl pt-2">
                    <DataTable data={page_data.data} columns={cols} />
                </div>
                <div className="mt-2 grid w-[300px] gap-4 py-2 pe-2">
                    <div className="rounded-lg bg-red-500"></div>
                    <div className="rounded-lg bg-blue-500"></div>
                </div>
            </div>
        </AppLayout>
    );
}
