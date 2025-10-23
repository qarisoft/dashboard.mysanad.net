'use client';

import * as React from 'react';
// import {
//     closestCenter,
//     DndContext,
//     KeyboardSensor,
//     MouseSensor,
//     TouchSensor,
//     useSensor,
//     useSensors,
//     type DragEndEvent,
//     type UniqueIdentifier,
// } from "@dnd-kit/core"
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
// import {
//     arrayMove,
//     SortableContext,
//     useSortable,
//     verticalListSortingStrategy,
// } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconLayoutColumns,
    IconPlus,
} from '@tabler/icons-react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
// import { z } from "zod"
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useLang } from '@/hooks/use-lang';

export function DataTable<T extends { id: number }>({
    data,
    columns,
    onCreate,
}: {
    data: T[];
    columns: ColumnDef<T>[];
    onCreate?: () => void;
}) {
    // const [data, setData] = React.useState(() => initialData);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 15,
    });

    const table = useReactTable({
        data,
        columns,
        state: {
            // sorting,
            // columnVisibility,
            // rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });
    const { __ } = useLang();
    return (
        <div
            // defaultValue="outline"
            className="flex h-full w-full flex-col justify-start gap-6"
        >
            <div className="bg-amber-00 flex items-center justify-between px-4 pt-6 lg:px-6">
                <div className="flex flex-1 pe-5">
                    <div className="flex-1">
                        <Input className={'w-'} placeholder={'Search...'} />
                    </div>
                    <div className="flex-1"></div>
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <IconLayoutColumns />
                                <span className="hidden lg:inline">
                                    Customize Columns
                                </span>
                                <span className="lg:hidden">Columns</span>
                                <IconChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !==
                                        'undefined' && column.getCanHide(),
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {onCreate && (
                        <Button variant="outline" size="sm" onClick={onCreate} >
                            <IconPlus />
                            <span className="hidden lg:inline">
                                {__('Create')}
                            </span>
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-red-00 relative flex flex-1 flex-col gap-4 overflow-auto px-4 lg:px-6">
                <div className="overflow-hidde flex-1 overflow-auto rounded-lg border">
                    <Table>
                        <TableHeader className="sticky top-0 z-10 bg-muted">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className={'text-center'}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column
                                                            .columnDef.header,
                                                        header.getContext(),
                                                    )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className="overflow-auto **:data-[slot=table-cell]:first:w-8">
                            {table.getRowModel().rows?.length ? (
                                <>
                                    {table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={`row-${row.id}`}
                                            data-state={
                                                row.getIsSelected() &&
                                                'selected'
                                            }
                                            className="relative z-0 px-2! data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={`r-${row.id}-c-${cell.id}`}
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))}
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="py- bg-red-00 flex items-center justify-between px-4 pb-2">
                    <div className="flex- flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Label
                                htmlFor="rows-per-page"
                                className="text-sm font-medium"
                            >
                                Rows per page
                            </Label>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger
                                    size="sm"
                                    className="w-20"
                                    id="rows-per-page"
                                >
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {[10, 15, 20, 30, 40, 50].map(
                                        (pageSize) => (
                                            <SelectItem
                                                key={pageSize}
                                                value={`${pageSize}`}
                                            >
                                                {pageSize}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                            Page {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </div>
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">
                                    Go to first page
                                </span>
                                <IconChevronsLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                <span className="sr-only">
                                    Go to previous page
                                </span>
                                <IconChevronLeft />
                            </Button>
                            <Button
                                variant="outline"
                                className="size-8"
                                size="icon"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to next page</span>
                                <IconChevronRight />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden size-8 lg:flex"
                                size="icon"
                                onClick={() =>
                                    table.setPageIndex(table.getPageCount() - 1)
                                }
                                disabled={!table.getCanNextPage()}
                            >
                                <span className="sr-only">Go to last page</span>
                                <IconChevronsRight />
                            </Button>
                        </div>
                    </div>

                    <div className="flex- hidden text-sm text-muted-foreground lg:flex">
                        {table.getFilteredSelectedRowModel().rows.length} of{' '}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                </div>
            </div>
        </div>
    );
}



