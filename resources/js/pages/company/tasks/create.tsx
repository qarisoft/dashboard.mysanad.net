// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

import TasksController from '@/actions/App/Http/Controllers/Company/TasksController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoaderCircle } from 'lucide-react';
import { FC } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const task = {
    code: '',
    notes: '',
    must_do_at: '',

    order_number: '',
    suk_number: '',
    license_number: '',
    scheme_number: '',
    piece_number: '',
    age: '',
    address: '',
    near_south: '',
    near_north: '',
    near_west: '',
    near_east: '',

    is_published: false,
    customer_id: null,
    city_id: null,
    attach: [],
    district: '',
    estate_type: '',
    location: { lat: 22.374293203734286, lng: 44.02110082491955 },
};
export default function Dashboard(a) {
    console.log(a);
    const { __ } = useLang();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Form
                    {...TasksController.store.form()}
                    // resetOnSuccess={['password']}
                >
                    {({ processing, errors }) => (
                        <div className={''}>
                            <div className="bg-amb500 grid w-full flex-1 grid-cols-4 gap-6 rounded-lg border p-4">
                                <div className="col-span-2 row-span-5 flex flex-col">
                                    <div className="bg-amber-500 flex-1"></div>
                                    <div className="grid grid-cols-2 mt-3 gap-6">
                                        <TextField
                                            l={'Lat'}
                                            placeHolder={'Lat'}
                                            id={'lat'}
                                            error={errors.lat}
                                        />
                                        <TextField
                                            l={'Code'}
                                            placeHolder={'Code'}
                                            id={'lng'}
                                            error={errors.lng}
                                        />
                                    </div>
                                </div>
                                <TextField
                                    l={'Code'}
                                    placeHolder={'Code'}
                                    id={'code'}
                                    error={errors.code}
                                />
                                <TextField
                                    l={'Notes'}
                                    placeHolder={'Notes'}
                                    id={'notes'}
                                    error={errors.notes}
                                />

                                <TextField
                                    l={'order_number'}
                                    placeHolder={'order_number'}
                                    id={'order_number'}
                                    error={errors.order_number}
                                />
                                <TextField
                                    l={'suk_number'}
                                    placeHolder={'suk_number'}
                                    id={'suk_number'}
                                    error={errors.suk_number}
                                />
                                <TextField
                                    l={'license_number'}
                                    placeHolder={'license_number'}
                                    id={'license_number'}
                                    error={errors.license_number}
                                />
                                <TextField
                                    l={'scheme_number'}
                                    placeHolder={'scheme_number'}
                                    id={'scheme_number'}
                                    error={errors.scheme_number}
                                />
                                <TextField
                                    l={'piece_number'}
                                    placeHolder={'piece_number'}
                                    id={'piece_number'}
                                    error={errors.piece_number}
                                />
                                <TextField
                                    l={'age'}
                                    placeHolder={'age'}
                                    id={'age'}
                                    error={errors.age}
                                />
                                <TextField
                                    l={'address'}
                                    placeHolder={'address'}
                                    id={'address'}
                                    error={errors.address}
                                />
                                <TextField
                                    l={'near_south'}
                                    placeHolder={'near_south'}
                                    id={'near_south'}
                                    error={errors.near_south}
                                />
                                <TextField
                                    l={'near_north'}
                                    placeHolder={'near_north'}
                                    id={'near_north'}
                                    error={errors.near_north}
                                />
                                <TextField
                                    l={'near_west'}
                                    placeHolder={'near_west'}
                                    id={'near_west'}
                                    error={errors.near_west}
                                />
                                <TextField
                                    l={'near_east'}
                                    placeHolder={'near_east'}
                                    id={'near_east'}
                                    error={errors.near_east}
                                />
                            </div>

                            <div className="p-">
                                <Button
                                    type="submit"
                                    className="mt-4"
                                    // tabIndex={4}
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

const TextField: FC<{
    l: string;
    error?: string;
    id: string;
    t?: React.HTMLInputTypeAttribute | undefined;
    placeHolder?: string | undefined;
    required?: boolean;
    tabIndex?: number;
    autoComplete?: React.HTMLInputAutoCompleteAttribute | undefined;
}> = ({ error, l, id, t, placeHolder, required, tabIndex, autoComplete }) => {
    const { __ } = useLang();
    return (
        <div className="relative grid gap-2">
            <Label htmlFor={id}>{__(l)}</Label>

            <Input
                id={id}
                type={t ?? 'text'}
                name={id}
                required={required}
                tabIndex={tabIndex}
                autoComplete={autoComplete}
                placeholder={__(placeHolder ?? '')}
            />
            <div className="h-3"></div>
            <InputError
                message={error}
                className={'absolute start-0 bottom-0'}
            />
        </div>
    );
};
