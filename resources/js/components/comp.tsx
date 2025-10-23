'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ComponentProps, FC, useRef } from 'react';
import { useLang } from '@/hooks/use-lang';

export const Combobox: FC<
    {
        data: { value: string; label: string }[];
        title:string

    } & ComponentProps<'input'>
> = ({ data,title, ...rest }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(() => rest.defaultValue?.toString() ?? '');
    const btnRef = useRef<HTMLButtonElement>(null);
    const {__}=useLang()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    ref={btnRef}
                    className="w-full justify-between "
                >
                    {value ? (
                        data.find((framework) => framework.value === value)
                            ?.label
                    ) : (
                        <span className={'text-muted-foreground'}>{__('Select') + ' ' + `${__(title)}...`}</span>
                    )}
                    <ChevronsUpDown className="opacity-50" />
                    <Input value={value} {...rest} type={'hidden'} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                style={{ minWidth: btnRef.current?.clientWidth ?? 300 }}
                className="w-[200px] p-0"
            >
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {data.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(
                                            currentValue === value
                                                ? ''
                                                : currentValue,
                                        );
                                        setOpen(false);
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            value === framework.value
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
