import { usePage } from '@inertiajs/react';

type Replaces = Record<string, string | number>;
type LangValue = string | { [key: string]: string | LangValue };
type LangObject = Record<string, LangValue>;
export type UseLang = {
    t: (key: string, replaces?: Replaces | string) => string;
    __: (key: string, replaces?: Replaces | string) => string;
    side: 'right' | 'left';
    xSide: 'right' | 'left';
    dir: 'rtl' | 'ltr';
    locale: 'ar' | 'en';
};
export function useLang(): UseLang {
    const {
        lang: lang1,
        lang_json,
        locale,
    } = usePage<{
        lang: LangObject;
        lang_json: Record<string, string>;
        locale: string;
    }>().props;
    const lang = { ...lang_json, lang1 };
    const side: 'right' | 'left' = locale == 'ar' ? 'right' : 'left';
    const xSide: 'right' | 'left' = locale == 'ar' ? 'left' : 'right';
    const dir = locale == 'ar' ? 'rtl' : 'ltr';
    const loc = locale == 'ar' ? 'ar' : 'en';

    function trans(key: string, replaces: Replaces | string = {}): string {
        const raw = getValueFromKey(key);
        // console.log('key ', key, ' raw ', raw);
        if (typeof raw !== 'string') return key;

        let translated = raw;

        if (typeof replaces === 'string') {
            translated += ' ' + replaces;
        } else if (typeof replaces === 'object') {
            translated = replacePlaceholders(translated, replaces);
        }

        return translated;
    }

    // function __(key: string, replaces: Replaces | string = {}) {
    //     return trans(key, replaces);
    // }

    function t(key: string, replaces: Replaces | string = {}) {
        // console.log(key);
        return trans(key, replaces);
    }

    function replacePlaceholders(text: string, replaces: Replaces): string {
        return Object.entries(replaces).reduce(
            (acc, [key, val]) => acc.replaceAll(`{${key}}`, String(val)),
            text,
        );
    }

    function getValueFromKey(key: string): string | undefined {
        const segments = key.split('.');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: any = lang;
        // console.log(current);

        for (const segment of segments) {
            if (typeof current !== 'object' || current === null)
                return undefined;
            current = current[segment];
        }

        return typeof current === 'string' ? current : undefined;
    }

    return { t, side, xSide, dir, locale: loc, __: t };
}
