import { User } from '@/types/index';

export interface Link {
    url: string;
    active: boolean;
    label: string;
    page: number;
}
export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    from: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    path: string;
    links: Link[];
    next_page_url: string | null;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type WithTimeStamp<T> = T & {
    created_at: string;
    updated_at: string;
};
export type str = string | undefined;

// ######       ########
// ###### PAGES ########
// ######       ########
export type TaskStatus = {
    id: number;
    code: string;
    name: string;
    color: string;
    default: boolean;
    created_at: string;
    updated_at: string;
};
export type TaskObj = {
    id: number;
    code: string;
    notes: string | undefined;
    is_published: boolean;
    is_available: boolean;
    company_id: number;
    viewer_id: number | undefined;
    customer_id: number;
    task_status_id: number;
    city_id: number;
    location_id: number;
    received_at: string;
    must_do_at: string;
    finished_at: string | undefined;
    published_at: string | undefined;
    order_number: string | undefined;
    suk_number: string | undefined;
    license_number: string | undefined;
    scheme_number: string | undefined;
    piece_number: string | undefined;
    age: string | undefined;
    address: string | undefined;
    district: string | undefined;
    estate_type: string | undefined;
    near_south: string | undefined;
    near_north: string | undefined;
    near_west: string | undefined;
    near_east: string | undefined;
    company_feedback: string | undefined;
    attach: string[] | undefined;
    created_at: string | undefined;
    updated_at: string | undefined;
};
export type Task = {
    is_done?: boolean;
    id: number;
    code: string;
    notes: string | undefined;
    is_published: boolean;
    is_available: boolean;
    company_id: number;
    viewer_id: number | undefined;
    customer_id: number;
    task_status_id: number;
    city_id: number;
    city?: {
        name: string;
    };
    location_id: number;
    received_at: string;
    must_do_at: string;
    finished_at: string | undefined;
    published_at: string | undefined;
    order_number: string | undefined;
    suk_number: string | undefined;
    license_number: string | undefined;
    scheme_number: string | undefined;
    piece_number: string | undefined;
    age: string | undefined;
    address: string | undefined;
    district: string | undefined;
    estate_type: string | undefined;
    near_south: string | undefined;
    near_north: string | undefined;
    near_west: string | undefined;
    near_east: string | undefined;
    company_feedback: string | undefined;
    attach: string[] | undefined;
    created_at: string | undefined;
    updated_at: string | undefined;
    location?: LatLng;
    status: {
        id: number;
        code: string;
        name: string;
        color: string;
        default: boolean;
        created_at: string;
        updated_at: string;
    };
    customer: {
        id: number;
        name: string;
        user_id: number;
        is_active: boolean;
        created_at: string;
        updated_at: string;
        user: {
            id: number;
            name: string;
        };
    };
    viewer?: {
        id: number;
        name: string;
        user_id: number;
        is_active: boolean;
        created_at: string;
        updated_at: string;
        user: {
            id: number;
            name: string;
        };
    };
};

// ########     Mail   ############
export type Mail = {
    id: string | number;
    name?: string;
    email?: string;
    subject: string;
    text: string;
    date: string;
    read: boolean;
    labels: string[];
    from_id: number;
    recipients?: { id: number; name: string; email: string }[];
    replies?: Mail[];
};
// export type  OutMail = {
//     id: string | number,
//     name?: string,
//     email?: string,
//     subject: string,
//     text: string,
//     date: string,
//     read: boolean,
//     labels: string[],
//     from_id:number,
//     replies?: Mail[]
// }
export type Msg = WithTimeStamp<{
    id: number;
    user_id: number;
    company_id: number;
    subject: string;
    body: string;
    to_id: number;
    from_id: number;

    all: boolean;
    was_read: boolean;
    sender?: {
        name: string;
        email: string;
    };
}>;
export type MsgWithReplies = Msg & {
    replies?: Msg[];
    users?: { id: number; name: string; email: string }[];
};

//###############################
export type Region = WithTimeStamp<{
    id: number;
    code: str;
    name: str;
    name_en: str;
    capital_city_id: number;
}>;
export type District = WithTimeStamp<{
    id: number;
    name: str;
    name_en: str;
    region_id: number;
    city_id: number;
}>;
export type City = WithTimeStamp<{
    id: number;
    name: str;
    name_en: str;
    region_id: number;
}>;
export type TaskStats = {
    task_status_id: number | string;
    task_count: number;
    name: string;
    color: string;
    code: string;
};
export type LatLng = { lat: number; lng: number };
export type PriceEvaluation = {
    task_id: number;
    id: string;
    name: string;
    key: string;
};
export type EstateType = {
    id: string;
    name: string;
};



export type Customer= {
    id: number;
    name: string;
    user_id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    user: User
};
