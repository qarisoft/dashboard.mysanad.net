// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useLang } from '@/hooks/use-lang';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head, usePage } from '@inertiajs/react';

import TanseeqController from '@/actions/App/Http/Controllers/Company/TanseeqController';
import InputError from '@/components/input-error';
import { MyMap } from '@/components/map';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PriceEvaluation, Task } from '@/types/data';
// import {  Textarea } from '@headlessui/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { LoaderCircle } from 'lucide-react';
import { ComponentProps, FC, useState } from 'react';
import {
    SelectWithSearchField,
    TextAreaField,
    TextField,
} from '@/components/text-field';
import { FileUpload } from '@/pages/company/tasks/create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    task,
    uploads,
}: {
    task: Task;
    uploads: { id: number }[];
}) {
    // console.log(a);
    const { __ } = useLang();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-auto rounded-xl p-4">
                <div className={'flex-1'}>
                    <Tabs defaultValue={'info'}>
                        <TabsList>
                            <TabsTrigger value={'info'}>
                                {__('Task Info')}
                            </TabsTrigger>
                            <TabsTrigger
                                // disabled={uploads?.length == 0}
                                value={'uploads'}
                            >
                                {__('Task Uploads')}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value={'info'}>
                            <TaskInfoPage />
                        </TabsContent>
                        <TabsContent value={'uploads'}>
                            <TaskUploadsPage />
                        </TabsContent>
                    </Tabs>

                    <div className=""></div>
                </div>
                {!task.is_done && (
                    <div className={'flex gap-3 p-3'}>
                        <TaskApproveDialog />
                        <SendBackDialog />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

const TaskUploadsPage: FC = () => {
    const {
        props: { price, uploads },
    } = usePage<{ price: PriceEvaluation[]; uploads: any }>();
    const { __ } = useLang();
    console.log(uploads);
    return (
        <div>
            <Table className={'p-2'}>
                <TableHeader className={'bg-muted'}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Square Meter Area</TableCell>
                        <TableCell>Square Meter Price</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {price.map((p) => (
                        <TableRow key={`row-id-${p.id}-${p.task_id}`}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>0$</TableCell>
                            <TableCell>0$</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const TaskApproveDialog = () => {
    const {
        props: { task },
    } = usePage<{ task: Task }>();
    const [open2, setOpen2] = useState(false);
    const { __ } = useLang();

    return (
        <Dialog open={open2} onOpenChange={setOpen2}>
            <DialogTrigger asChild>
                <Button className="mt-4" variant={'outline'}>
                    {__('Approve')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className={'p-2'}>
                    <DialogTitle>
                        {__('Approve the Task is Completely Done')}
                    </DialogTitle>
                    <DialogDescription>
                        {__(
                            'By this action the task will be converted from waiting status into Completed status',
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="p-4">
                    <Form
                        {...TanseeqController.complete.form(task.id)}
                        onSuccess={() => {
                            setOpen2(false);
                        }}
                    >
                        {({ processing }) => (
                            <div className={'flex flex-col gap-3'}>
                                <Label>
                                    {__(
                                        'Are you sure you want to do this action?',
                                    )}
                                </Label>

                                <div className="mt-4">
                                    <Button type={'submit'}>
                                        {__('Submit')}
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};
const SendBackDialog = () => {
    const {
        props: { task },
    } = usePage<{ task: Task }>();
    const [open1, setOpen1] = useState(false);
    const { __ } = useLang();

    return (
        <Dialog open={open1} onOpenChange={setOpen1}>
            <DialogTrigger asChild>
                <Button className="mt-4" variant={'outline'}>
                    {__('Send Back To The Viewer')}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className={'p-2'}>
                    <DialogTitle>{__('Send Back To the Viewer')}</DialogTitle>
                    <DialogDescription>
                        {__(
                            'Send back to the viewer to check the missing points and resubmitting the form',
                        )}
                    </DialogDescription>
                </DialogHeader>
                <div className="p-4">
                    <Form
                        {...TanseeqController.sendBack.form(task.id)}
                        onSuccess={() => setOpen1(false)}
                    >
                        {({ processing }) => (
                            <div className={'flex flex-col gap-3'}>
                                <Label htmlFor={'note'}>{__('Note')}</Label>
                                <Textarea
                                    className={'border'}
                                    autoFocus
                                    name={'note'}
                                    id={'note'}
                                />

                                <div className="mt-4">
                                    <Button type={'submit'}>
                                        {__('Submit')}
                                        {processing && (
                                            <LoaderCircle className="h-4 w-4 animate-spin" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const TaskInfoPage = () => {
    const {
        props: { task },
    } = usePage<{ task: Task }>();
    const { __ } = useLang();
    console.log(task);
    return  (
        <div className="bg-amb500 grid w-full flex-1 grid-cols-4 gap-6 rounded-lg border p-4">
            <div className="col-span-2 grid grid-cols-2 gap-4">

                <TextField
                    l={'customer'}
                    defaultValue={task.customer.name}
                    disabled
                />
                <TextField
                    l={'order_number'}
                    defaultValue={task.order_number}
                    disabled
                />
                <TextField
                    l={'city'}
                    defaultValue={task.city?.name}
                    disabled
                />

                <TextField
                    l={'Must Do at'}
                    defaultValue={task.must_do_at}
                    type={'datetime-local'}
                    disabled
                />
                <TextField
                    disabled
                    l={'Estate'}
                    defaultValue={task.estate?.name}
                    // type={'datetime-local'}
                />

                <TextField
                    disabled
                    l={'address'}
                    defaultValue={task.address}
                />

                <TextField
                    disabled
                    l={'suk_number'}
                    defaultValue={task.suk_number}
                />
                <TextField
                    disabled
                    l={'license_number'}
                    defaultValue={task.license_number}
                />
                <TextField
                    disabled
                    l={'scheme_number'}
                    defaultValue={task.scheme_number}
                />
                <TextField
                    disabled
                    l={'piece_number'}
                    defaultValue={task.piece_number}
                />

                <div className="col-span-2">
                    <div className="p-2">{__('Docs')}</div>
                    <div className="grid grid-cols-3 gap-6">
                        <FileUpload
                            disabled
                            label={'Suck File'}
                            id={'suck_file'}
                        />
                        <FileUpload
                            disabled
                            label={'Licence File'}
                            id={'licence_file'}
                        />
                        <FileUpload
                            disabled

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
                    // error={errors.notes}
                />
            </div>
            <div className="col-span-2 row-span-5 flex flex-col">
                <div className="flex-1">
                    <MyMap
                        // onClick={(e) => {
                        //     setTLocation((o) => ({
                        //         lat:
                        //             e.detail.latLng?.lat ??
                        //             o.lat,
                        //         lng:
                        //             e.detail.latLng?.lng ??
                        //             o.lng,
                        //     }));
                        // }}
                    >
                        <AdvancedMarker
                            position={task.location}
                        />
                    </MyMap>
                </div>
            </div>
        </div>

    )

    return (
        <div className="bg-amb500 grid w-full flex-1 grid-cols-4 gap-6 rounded-lg border p-4">
            <div className="col-span-2 row-span-5 flex flex-col">
                <div className="flex-1 border-amber-500">
                    <MyMap>
                        <AdvancedMarker
                            position={{
                                lat: task.location?.lat ?? 0,
                                lng: task.location?.lng ?? 0,
                            }}
                        />
                    </MyMap>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-6">
                    <TextField
                        l={'Lat'}
                        placeholder={'Lat'}
                        id={'lat'}
                        defaultValue={task.location?.lat}
                        disabled
                    />
                    <TextField
                        disabled
                        l={'Code'}
                        defaultValue={task.location?.lng}
                        placeholder={'Code'}
                        id={'lng'}
                    />
                </div>
            </div>
            <TextField
                disabled
                l={'Code'}
                placeholder={'Code'}
                defaultValue={task.code}
                id={'code'}
            />
            <TextField
                disabled
                l={'Notes'}
                placeholder={'Notes'}
                defaultValue={task.notes}
                id={'notes'}
            />

            <TextField
                disabled
                l={'order_number'}
                placeholder={'order_number'}
                defaultValue={task.order_number}
                id={'order_number'}
            />
            <TextField
                disabled
                l={'suk_number'}
                placeholder={'suk_number'}
                defaultValue={task.suk_number}
                id={'suk_number'}
            />
            <TextField
                disabled
                l={'license_number'}
                placeholder={'license_number'}
                defaultValue={task.license_number}
                id={'license_number'}
            />
            <TextField
                disabled
                l={'scheme_number'}
                placeholder={'scheme_number'}
                defaultValue={task.scheme_number}
                id={'scheme_number'}
            />
            <TextField
                disabled
                l={'piece_number'}
                placeholder={'piece_number'}
                defaultValue={task.piece_number}
                id={'piece_number'}
            />
            <TextField
                disabled
                l={'age'}
                placeholder={'age'}
                defaultValue={task.age}
                id={'age'}
            />
            <TextField
                disabled
                l={'address'}
                placeholder={'address'}
                defaultValue={task.address}
                id={'address'}
            />
            <TextField
                disabled
                l={'near_south'}
                placeholder={'near_south'}
                defaultValue={task.near_south}
                id={'near_south'}
            />
            <TextField
                disabled
                l={'near_north'}
                placeholder={'near_north'}
                defaultValue={task.near_north}
                id={'near_north'}
            />
            <TextField
                disabled
                l={'near_west'}
                placeholder={'near_west'}
                defaultValue={task.near_west}
                id={'near_west'}
            />
            <TextField
                disabled
                l={'near_east'}
                placeholder={'near_east'}
                defaultValue={task.near_east}
                id={'near_east'}
            />
        </div>
    );
};
