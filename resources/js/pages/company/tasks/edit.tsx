// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { Form, Head, usePage } from '@inertiajs/react';

import TasksController from '@/actions/App/Http/Controllers/Company/TasksController';
import { MyMap } from '@/components/map';
import {
    SelectWithSearchField,
    TextAreaField,
    TextField,
} from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/pages/company/tasks/create';
import { edit, index } from '@/routes/company/tasks';
import { City, Customer, EstateType, LatLng, Task } from '@/types/data';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({
    customers,
    cities,
    estates,
    task,
    suck_file,
                                      licence_file
}: {
    customers: Customer[];
    cities: City[];
    // errors: any;
    estates: EstateType[];
    task: Task;
    suck_file:string
    licence_file:string
}) {
    // console.log(a);
    const { __ } = useLang();
    const [tLocation, setTLocation] = useState<LatLng>(() => ({
        lat: task?.location?.lat??0,
        lng: task?.location?.lng??0,
    }));
    const a = usePage()
    console.log(a);
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Tasks',
                    href: index().url,
                },
                {
                    title: 'Edit',
                    href: edit(task.id).url,
                },
            ]}
        >
            <Head title="Dashboard" />
            <div

                // style={{backgroundImage:`url(${suck_file})`}}
                className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    {...TasksController.update.form(task.id)}
                    transform={(data) => {
                        data['location'] = tLocation;
                        return data;
                    }}
                    // resetOnSuccess={['password']}
                >
                    {({ processing, errors }) => (
                        <div className={''}>
                            <div className="bg-amb500 grid w-full flex-1 grid-cols-4 gap-6 rounded-lg border p-4">
                                <div className="col-span-2 grid grid-cols-2 gap-4">
                                    <SelectWithSearchField
                                        defaultValue={task.customer_id}
                                        l={'Customer'}
                                        id={'customer_id'}
                                        required
                                        error={errors.customer_id}
                                        dataList={customers.map((v) => ({
                                            label: `${v.name}`,
                                            value: v.id.toString(),
                                        }))}
                                    />
                                    <TextField
                                        defaultValue={task.order_number}
                                        l={'order_number'}
                                        placeholder={'order_number'}
                                        id={'order_number'}
                                        error={errors.order_number}
                                    />

                                    <SelectWithSearchField
                                        defaultValue={task.city_id}
                                        l={'City'}
                                        id={'city_id'}
                                        error={errors.city_id}
                                        dataList={cities.map((v) => ({
                                            label: `${v.name}`,
                                            value: v.id.toString(),
                                        }))}
                                    />
                                    <TextField
                                        defaultValue={task.must_do_at}
                                        l={'Must Do at'}
                                        placeholder={'Date'}
                                        id={'must_do_at'}
                                        error={errors.must_do_at}
                                        type={'datetime-local'}
                                    />

                                    <SelectWithSearchField
                                        defaultValue={task.estate_type_id}
                                        l={'Estate Type'}
                                        id={'estate_type_id'}

                                        error={errors.estate_type_id}
                                        dataList={estates.map((v) => ({
                                            label: `${v.name}`,
                                            value: v.id.toString(),
                                        }))}
                                    />
                                    <TextField
                                        defaultValue={task.address}
                                        l={'address'}
                                        // l={'address'}
                                        placeholder={'address'}
                                        id={'address'}
                                        error={errors.address}
                                    />

                                    <TextField
                                        defaultValue={task.suk_number}
                                        l={'suk_number'}
                                        placeholder={'suk_number'}
                                        id={'suk_number'}
                                        error={errors.suk_number}
                                    />
                                    <TextField
                                        defaultValue={task.license_number}
                                        l={'license_number'}
                                        placeholder={'license_number'}
                                        id={'license_number'}
                                        error={errors.license_number}
                                    />
                                    <TextField
                                        defaultValue={task.scheme_number}
                                        l={'scheme_number'}
                                        placeholder={'scheme_number'}
                                        id={'scheme_number'}
                                        error={errors.scheme_number}
                                    />
                                    <TextField
                                        defaultValue={task.piece_number}
                                        l={'piece_number'}
                                        placeholder={'piece_number'}
                                        id={'piece_number'}
                                        error={errors.piece_number}
                                    />

                                    <div className="col-span-2">
                                        <div className="p-2">{__('Docs')}</div>
                                        <div


                                            className="grid grid-cols-3 gap-6">
                                            <FileUpload
                                                label={'Suck File'}
                                                defaultValue={suck_file}
                                                id={'suck_file'}
                                            />
                                            <FileUpload
                                                defaultValue={licence_file}
                                                label={'Licence File'}
                                                id={'licence_file'}
                                            />
                                            <FileUpload
                                                label={'Other File'}
                                                id={'other_file'}
                                            />
                                        </div>
                                    </div>

                                    <TextAreaField
                                        className={
                                            'borde col-span-2 row-span-3 mt-2'
                                        }
                                        l={'Notes'}
                                        className1={'min-h-[5rem]'}
                                        placeholder={'Notes'}
                                        id={'notes'}
                                        error={errors.notes}
                                    />
                                </div>
                                <div className="col-span-2 row-span-5 flex flex-col">
                                    <div className="flex-1">
                                        <MyMap
                                            onClick={(e) => {
                                                setTLocation((o) => ({
                                                    lat:
                                                        e.detail.latLng?.lat ??
                                                        o.lat,
                                                    lng:
                                                        e.detail.latLng?.lng ??
                                                        o.lng,
                                                }));
                                            }}
                                        >
                                            <AdvancedMarker
                                                position={tLocation}
                                            />
                                        </MyMap>
                                    </div>
                                </div>
                            </div>

                            <div className="p-">
                                <Button
                                    type="submit"
                                    className="mt-4"
                                    disabled={processing}
                                    data-test="login-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    {__('Save')}
                                </Button>
                            </div>
                        </div>
                        // <div className={''}>
                        //
                        //     <div className="bg-amb500 grid w-full flex-1 grid-cols-4 gap-6 rounded-lg border p-4">
                        //         <div className="col-span-2 row-span-5 flex flex-col">
                        //             <div className="flex-1">
                        //                 <MyMap>
                        //                     <AdvancedMarker
                        //                         position={{
                        //                             lat:
                        //                                 task.location?.lat ?? 0,
                        //                             lng:
                        //                                 task.location?.lng ?? 0,
                        //                         }}
                        //                     />
                        //                 </MyMap>
                        //             </div>
                        //             <div className="mt-3 grid grid-cols-2 gap-6">
                        //                 <TextField
                        //                     l={'Lat'}
                        //                     placeholder={'Lat'}
                        //                     id={'lat'}
                        //                     error={errors.lat}
                        //                 />
                        //                 <TextField
                        //                     l={'Code'}
                        //                     placeholder={'Lng'}
                        //                     id={'lng'}
                        //                     error={errors.lng}
                        //                 />
                        //             </div>
                        //         </div>
                        //
                        //         <TextField
                        //             l={'Code'}
                        //             placeholder={'Code'}
                        //             defaultValue={task.code}
                        //             id={'code'}
                        //         />
                        //         <TextField
                        //             l={'Notes'}
                        //             placeholder={'Notes'}
                        //             defaultValue={task.notes}
                        //             id={'notes'}
                        //         />
                        //
                        //         <TextField
                        //             l={'order_number'}
                        //             placeholder={'order_number'}
                        //             defaultValue={task.order_number}
                        //             id={'order_number'}
                        //         />
                        //         <TextField
                        //             l={'suk_number'}
                        //             placeholder={'suk_number'}
                        //             defaultValue={task.suk_number}
                        //             id={'suk_number'}
                        //         />
                        //         <TextField
                        //             l={'license_number'}
                        //             placeholder={'license_number'}
                        //             defaultValue={task.license_number}
                        //             id={'license_number'}
                        //         />
                        //         <TextField
                        //             l={'scheme_number'}
                        //             placeholder={'scheme_number'}
                        //             defaultValue={task.scheme_number}
                        //             id={'scheme_number'}
                        //         />
                        //         <TextField
                        //             l={'piece_number'}
                        //             placeholder={'piece_number'}
                        //             defaultValue={task.piece_number}
                        //             id={'piece_number'}
                        //         />
                        //         <TextField
                        //             l={'age'}
                        //             placeholder={'age'}
                        //             defaultValue={task.age}
                        //             id={'age'}
                        //         />
                        //         <TextField
                        //             l={'address'}
                        //             placeholder={'address'}
                        //             defaultValue={task.address}
                        //             id={'address'}
                        //         />
                        //         <TextField
                        //             l={'near_south'}
                        //             placeholder={'near_south'}
                        //             defaultValue={task.near_south}
                        //             id={'near_south'}
                        //         />
                        //         <TextField
                        //             l={'near_north'}
                        //             placeholder={'near_north'}
                        //             defaultValue={task.near_north}
                        //             id={'near_north'}
                        //         />
                        //         <TextField
                        //             l={'near_west'}
                        //             placeholder={'near_west'}
                        //             defaultValue={task.near_west}
                        //             id={'near_west'}
                        //         />
                        //         <TextField
                        //             l={'near_east'}
                        //             placeholder={'near_east'}
                        //             defaultValue={task.near_east}
                        //             id={'near_east'}
                        //         />
                        //     </div>
                        //
                        //     <div className="p-">
                        //         <Button
                        //             type="submit"
                        //             className="mt-4"
                        //             // tabIndex={4}
                        //             disabled={processing}
                        //             data-test="login-button"
                        //         >
                        //             {processing && (
                        //                 <LoaderCircle className="h-4 w-4 animate-spin" />
                        //             )}
                        //             {__('Save')}
                        //         </Button>
                        //     </div>
                        // </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
