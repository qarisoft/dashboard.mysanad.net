// import { PaginatedData, WithTimeStamp } from '@/types/data';
// import { User } from '@/types';
import { useLang } from '@/hooks/use-lang';
import { FC } from 'react';

export const Cell: FC<{ v: string }> = ({ v }) => {
    return <div className="p-2 text-center">{v}</div>;
};
export const TH: FC<{ v: string }> = ({ v }) => {
    const { __ } = useLang();
    return <div className="p-3 text-center font-bold">{__(v)}</div>;
};
