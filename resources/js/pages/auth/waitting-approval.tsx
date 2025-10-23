import { Head, Link } from '@inertiajs/react';

import { useLang } from '@/hooks/use-lang';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';


export default function Register() {
    const { __ } = useLang();

    return (
        <AuthLayout
            title="Waitting approval"
            description="this account is waiting for approval. please wait until it is approved."
        >
            <Head title="Register" />


            <Link  className="mx-auto block text-sm"  href={logout().url} method="post"  >
                {__('Log out')}
            </Link>
        </AuthLayout>
    );
}
