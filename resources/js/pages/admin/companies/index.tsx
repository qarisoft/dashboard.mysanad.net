import { DataTable } from '@/components/table/data-table';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/admin-layout';
import { dashboard } from '@/routes';
import { User, type BreadcrumbItem } from '@/types';
import { PaginatedData } from '@/types/data';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];
type Company = {
    id: number,
    name: string
    avatar_url: string
    user_id: number
    is_active: string
    file: string
    created_at: string
    updated_at: string
    tasks_count: number
    published_tasks_count: number
    employees_count: number
    viewers_count: number
    owner: User

}

export default function Dashboard({ page_data }: { page_data: PaginatedData<Company> }) {
    console.log(page_data);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* <DataTable data={} /> */}

            </div>
        </AppLayout>
    );
}
