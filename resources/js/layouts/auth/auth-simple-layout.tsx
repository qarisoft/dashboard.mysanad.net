import AppLogoIcon from '@/components/layout/app-logo-icon';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { SanadSVG } from '@/components/layout/app-logo';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={dashboard()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md flex">
                                {/*<AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />*/}
                                <AppLogo/>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

const AppLogo = () => (
    <div className="flex gap-2">
        <SanadSVG />
        <h1 className="my-auto text-[18px] font-bold text-nowrap">
            SANAD <span className="mx-0">|</span> سًنًد
        </h1>
    </div>
);

