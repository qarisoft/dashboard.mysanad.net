import { Form, Head } from '@inertiajs/react';
import { Download, LoaderCircle } from 'lucide-react';

import CreateCompanyController from '@/actions/App/Http/Controllers/Company/CreateCompanyController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/hooks/use-lang';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    const { __ } = useLang();
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...CreateCompanyController.store.form()}
                // resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="company_name">
                                    {__('Company Name')}
                                </Label>
                                <Input
                                    id="company_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    // autoComplete="name"
                                    name="company_name"
                                    placeholder="Company name"
                                />
                                <InputError
                                    message={errors.company_name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="my-2 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="pt-[3px] text-sm">
                                        {__('Agreement')}
                                    </div>
                                    <a href={'/t.pdf'} download={'/t.pdf'}>
                                        <Download
                                            size={16}
                                            className={'text-blue-600'}
                                        />
                                    </a>
                                </div>
                                <div className="border rounded flex justifiy-center items-center  h-30">
                                    <div className="text-gray-500">No thing</div>

                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="my-1 text-xs">
                                    {__('agree to sanad terms and conditions')}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox name={'agree'} id={'agree'} />
                                    <Label htmlFor="agree">{__('Agree')}</Label>
                                </div>
                                <InputError message={errors.agree} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-company-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                )}
                                Create Company
                            </Button>
                        </div>

                        {/*<div className="text-center text-sm text-muted-foreground">*/}
                        {/*    Already have an account?{' '}*/}
                        {/*    <TextLink href={login()} tabIndex={6}>*/}
                        {/*        Log in*/}
                        {/*    </TextLink>*/}
                        {/*</div>*/}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
