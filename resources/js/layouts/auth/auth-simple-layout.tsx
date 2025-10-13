import AppLogoIcon from '@/components/layout/app-logo-icon';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

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
        <h1 className="my-auto text-[18px] font-bold">
            SANAD <span className="mx-0">|</span> سًنًد
        </h1>
    </div>
);


const SanadSVG = ({ size = 30 }: { size?: number }) => (
    <svg width={`${size}`} height={`${size}`} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8534 9.67117C12.6128 12.6358 16.2844 13.6842 18.4947 11.5677L23.9805 6.31484C26.5243 3.87903 30.7469 5.68197 30.7469 9.20392V15.6041C30.7469 16.665 30.3255 17.6824 29.5753 18.4326L20.15 27.8579C17.6301 30.3778 13.3216 28.5931 13.3216 25.0295V20.6856C13.3216 18.4764 11.5307 16.6856 9.32155 16.6856H6.72693C4.90008 16.6856 3.30536 15.4479 2.85204 13.6782L0.627158 4.99259C-0.0209597 2.46243 1.8902 0 4.50205 0H6.27154C8.09839 0 9.69311 1.23771 10.1464 3.00742L11.8534 9.67117Z"
            fill="#008EFF"
        />
    </svg>
);
