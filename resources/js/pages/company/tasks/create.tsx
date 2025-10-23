// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, router } from '@inertiajs/react';

import TasksController from '@/actions/App/Http/Controllers/Company/TasksController';
import {
    SelectWithSearchField,
    TextAreaField,
    TextField,
} from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { City, Customer, EstateType, LatLng, str } from '@/types/data';
import { File, FileBadge, LoaderCircle, NonBinary } from 'lucide-react';
import { ComponentProps, FC, useRef, useState } from 'react';
// import { Combobox } from '@/components/comp';
import { MyMap } from '@/components/map';
import { cn } from '@/lib/utils';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    customers,
    cities,
    estate_types,
}: {
    customers: Customer[];
    cities: City[];
    errors: any;
    estate_types: EstateType[];
}) {
    console.log(estate_types);
    const { __ } = useLang();
    const [tLocation, setTLocation] = useState<LatLng>(() => ({
        lat: 0,
        lng: 0,
    }));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    {...TasksController.store.form()}
                    // resetOnSuccess={['password']}
                    transform={(data) => {
                        data['location'] = tLocation;
                        return data;
                    }}
                >
                    {({ processing, errors }) => (
                        <div className={''}>
                            <div className="bg-amb500 grid w-full flex-1 grid-cols-4 gap-6 rounded-lg border p-4">
                                <div className="col-span-2 grid grid-cols-2 gap-4">
                                    <SelectWithSearchField
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
                                        l={'order_number'}
                                        placeholder={'order_number'}
                                        id={'order_number'}
                                        error={errors.order_number}
                                    />

                                    <SelectWithSearchField
                                        l={'City'}
                                        id={'city_id'}
                                        error={errors.city_id}
                                        dataList={cities.map((v) => ({
                                            label: `${v.name}`,
                                            value: v.id.toString(),
                                        }))}
                                    />
                                    <TextField
                                        l={'Must Do at'}
                                        placeholder={'Date'}
                                        id={'must_do_at'}
                                        error={errors.must_do_at}
                                        type={'datetime-local'}
                                    />

                                    <SelectWithSearchField
                                        l={'Estate Type'}
                                        id={'estate_type_id'}
                                        error={errors.estate_type_id}
                                        dataList={estate_types.map((v) => ({
                                            label: `${v.name}`,
                                            value: v.id.toString(),
                                        }))}
                                    />
                                    <TextField
                                        l={'address'}
                                        // l={'address'}
                                        placeholder={'address'}
                                        id={'address'}
                                        error={errors.address}
                                    />

                                    <TextField
                                        l={'suk_number'}
                                        placeholder={'suk_number'}
                                        id={'suk_number'}
                                        error={errors.suk_number}
                                    />
                                    <TextField
                                        l={'license_number'}
                                        placeholder={'license_number'}
                                        id={'license_number'}
                                        error={errors.license_number}
                                    />
                                    <TextField
                                        l={'scheme_number'}
                                        placeholder={'scheme_number'}
                                        id={'scheme_number'}
                                        error={errors.scheme_number}
                                    />
                                    <TextField
                                        l={'piece_number'}
                                        placeholder={'piece_number'}
                                        id={'piece_number'}
                                        error={errors.piece_number}
                                    />

                                    <div className="col-span-2">
                                        <div className="p-2">{__('Docs')}</div>
                                        <div className="grid grid-cols-3 gap-6">
                                            <FileUpload
                                                label={'Suck File'}
                                                id={'suck_file'}
                                            />
                                            <FileUpload
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
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}

export const FileUpload: FC<
    { id: string; label: string } & ComponentProps<'input'>
> = ({ id, label, ...rest }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [defaultValue, setDefaultValue] = useState<string | undefined>(()=>rest.defaultValue?.toString());
    const onClick = () => {
        if (defaultValue!=undefined){
            router.get(defaultValue)
        }
        ref.current?.click();
    };
    return (
        <div>
            <div className="p-2 text-center text-gray-500">{label}</div>


            {defaultValue!=undefined?(
                <div
                // style={{backgroundImage:`url(${defaultValue})`}}
                className={'flex bg-cover aspect-video items-center justify-center rounded-lg bg-gray-50'}
                >
                    <div className="">
                        <File/>
                    </div>
                </div>
            ):(
                <div
                    onClick={rest.disabled ? undefined : onClick}
                    // style={{backgroundImage:`url(${file?.url})`}}
                    className={cn([
                        'flex aspect-video items-center justify-center rounded-lg bg-gray-50',
                        rest.disabled?'hover:cursor-not-allowed':'hover:cursor-pointer'
                    ])}
                >
                    <input
                        onChange={(e) => {
                            if (
                                e.target?.files?.length &&
                                e.target?.files?.length > 0
                            ) {
                                setFile(e.target?.files![0]);
                            }
                        }}
                        id={id}
                        name={id}
                        type={'file'}
                        className={'hidden'}
                        ref={ref}
                    />
                    <div className="el"></div>
                    <div
                        className={cn([
                            'flex flex-col items-center justify-center',
                            file == undefined ? 'text-gray-300' : 'text-gray-400',
                        ])}
                    >
                        <FileBadge className={''} />
                        {/*<div className="">{label}</div>*/}
                        <div className="text-center text-sm">{file?.name??defaultValue}</div>
                    </div>
                </div>
            )}

        </div>
    );
};
