import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { API_KEY } from '@/k';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1  gap-4 overflow-x-auto rounded-xl ">
                <div className="w-[15rem]"></div>
                <div className=" bg-red-400 flex-1">
                    <APIProvider apiKey={API_KEY}>
                        <Map
                            // style={{ width: '83.6vw', height: '94vh' }}
                            defaultCenter={{
                                lat: 23.158429955593782,
                                lng: 42.98542799663272,
                            }}
                            defaultZoom={6.6}
                            mapId={'ed23aa98c0a50d9945c2d1c7'}
                        >
                            {/*<Deferred fallback={<div>Loading...</div>} data={'tasks'}>*/}
                            {/*    <Markers tasks={tasks} />*/}
                            {/*</Deferred>*/}
                        </Map>
                    </APIProvider>
                </div>

            </div>
        </AppLayout>
    );
}
