import { ComponentProps, FC } from 'react';
import { useLang } from '@/hooks/use-lang';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Combobox } from '@/components/comp';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
// import { ComboboxDemo } from '@/pages/company/tasks/comp';

const TextField: FC<
    {
        l: string;
        error?: string;
        // id: string;
        t?: React.HTMLInputTypeAttribute | undefined;
    } & ComponentProps<'input'>
> = ({ error, l, id, t, placeholder,className, ...rest }) => {
    const { __ } = useLang();
    return (
        <div className={cn(["relative grid gap-2",className])} >
            <Label htmlFor={id}>{__(l)}</Label>

            <Input
                id={id}
                type={t ?? 'text'}
                name={id}
                placeholder={__(placeholder ?? '')}
                {...rest}
            />
            <div className="h-3"></div>
            <InputError
                message={error}
                className={'absolute start-0 bottom-0'}
            />
        </div>
    );
};

export const TextAreaField: FC<
    {
        l: string;
        className1?:string;
        error?: string;
        id: string;
        t?: React.HTMLInputTypeAttribute | undefined;
    } & ComponentProps<'textarea'>
> = ({ error, l, id, placeholder,className,className1, ...rest }) => {
    const { __ } = useLang();
    return (
        <div className={cn(["relative grid gap-2  h-[4rem]",className])} >
            <Label htmlFor={id}>{__(l)}</Label>

            <Textarea
                id={id}
                className={className1}
                // type={t ?? 'text'}
                name={id}
                placeholder={__(placeholder ?? '')}

                {...rest}
            />
            <div className="h-3"></div>
            <InputError
                message={error}
                className={'absolute start-0 bottom-0'}
            />
        </div>
    );
};
const SelectWithSearchField: FC<
    {
        l: string;
        error?: string;
        id: string;
        dataList: { label: string; value: string }[];
        t?: React.HTMLInputTypeAttribute | undefined;
    } & ComponentProps<'input'>
> = ({ error, l, id, placeholder,dataList, ...rest }) => {
    const { __ } = useLang();
    return (
        <div className="relative grid gap-2">
            <Label htmlFor={id}>{__(l)}</Label>
            <Combobox
                id={id}
                name={id}
                title={l}
                placeholder={__(placeholder ?? '')}
                data={dataList}
                {...rest}

            />

            <div className="h-3"></div>
            <InputError
                message={error}
                className={'absolute start-0 bottom-0'}
            />
        </div>
    );
};



export { TextField, SelectWithSearchField };
