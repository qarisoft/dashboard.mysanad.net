import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Laravel Starter Kit
                </span>
            </div>
        </>
    );
}



export const SanadSVG = ({ size = 30 }: { size?: number }) => (
    <svg width={`${size}`} height={`${size}`} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.8534 9.67117C12.6128 12.6358 16.2844 13.6842 18.4947 11.5677L23.9805 6.31484C26.5243 3.87903 30.7469 5.68197 30.7469 9.20392V15.6041C30.7469 16.665 30.3255 17.6824 29.5753 18.4326L20.15 27.8579C17.6301 30.3778 13.3216 28.5931 13.3216 25.0295V20.6856C13.3216 18.4764 11.5307 16.6856 9.32155 16.6856H6.72693C4.90008 16.6856 3.30536 15.4479 2.85204 13.6782L0.627158 4.99259C-0.0209597 2.46243 1.8902 0 4.50205 0H6.27154C8.09839 0 9.69311 1.23771 10.1464 3.00742L11.8534 9.67117Z"
            fill="#008EFF"
        />
    </svg>
);
