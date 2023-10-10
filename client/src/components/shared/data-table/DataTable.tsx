import { useEffect, useState } from 'react';
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

import { DataTableViewOptions } from './DataTableViewOptions';
import { DataTablePagination } from './DataTablePagination';
import { useSearchParams } from 'react-router-dom';
import SearchInput from '../SearchInput';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalEntries: number;
  isFetching?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalEntries,
  isFetching = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const pagination = {
    pageIndex: Number(searchParams.get('page')) || 0,
    pageSize: Number(searchParams.get('pageSize')) || 10,
  };

  useEffect(() => {
    if (sorting.length === 0) return;
    setSearchParams(searchParams => {
      searchParams.set('sort', (sorting[0].desc ? '-' : '') + sorting[0].id);
      return searchParams;
    });
  }, [sorting, setSearchParams]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    pageCount: Math.ceil(totalEntries / pagination.pageSize),
    onPaginationChange: updater => {
      if (typeof updater !== 'function') return;
      const { pageIndex, pageSize } = updater(pagination);
      setSearchParams(searchParams => {
        searchParams.set('page', pageIndex.toString());
        searchParams.set('pageSize', pageSize.toString());
        return searchParams;
      });
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
  });

  return (
    <div className="space-y-4">
      <div className="mt-2 flex items-center">
        <div className="flex flex-1 items-center space-x-4">
          <SearchInput
            placeholder="Filter forms..."
            className="w-72"
            debounce
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={isFetching ? 'opacity-60' : ''}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
      <DataTablePagination table={table} />
    </div>
  );
}
