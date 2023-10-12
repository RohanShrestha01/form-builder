import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { DataTable } from '../components/shared/data-table/DataTable';
import useTitle from '../hooks/useTitle';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import type { FormType, PaginatedResponseType } from '../types';
import { Checkbox } from '../components/ui/Checkbox';
import { DataTableColumnHeader } from '../components/shared/data-table/DataTableColumnHeader';
import { Switch } from '../components/ui/Switch';
import DataTableRowActions from '../components/my-forms/DataTableRowActions';

dayjs.extend(relativeTime);

interface FormsResponseType extends PaginatedResponseType {
  forms: FormType[];
}

export default function MyForms() {
  useTitle('My Forms | Form Builder');
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const params = {
    page: searchParams.get('page'),
    pageSize: searchParams.get('pageSize'),
    sort: searchParams.get('sort'),
  };
  const { data, isLoading, isError, isFetching } = useQuery<FormsResponseType>({
    queryKey: ['forms', params],
    queryFn: () =>
      axiosPrivate({
        url: '/forms',
        params,
      }).then(res => res.data.data),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: ({ formId, isActive }: { formId: string; isActive: boolean }) =>
      axiosPrivate.patch('/forms/' + formId, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries(['forms']);
      toast.success('Form updated successfully');
    },
    onError: () => toast.error('Error updating form'),
  });

  const columns: ColumnDef<FormType>[] = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'isActive',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <Switch
            checked={row.original.isActive}
            disabled={
              mutation.isLoading &&
              mutation.variables?.formId === row.original._id
            }
            onCheckedChange={checked => {
              mutation.mutate({ formId: row.original._id, isActive: checked });
            }}
          />
        ),
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Form Name" />
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ row }) => (
          <span>{dayjs(row.original.createdAt).format('MMM D, YYYY')}</span>
        ),
      },
      {
        accessorKey: 'updatedAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Last Updated" />
        ),
        cell: ({ row }) => (
          <span>{dayjs(row.original.updatedAt).fromNow()}</span>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions formId={row.original._id} />,
      },
    ],
    [mutation],
  );

  if (isLoading || isError) return;

  return (
    <DataTable<FormType, string>
      columns={columns}
      data={data.forms}
      totalEntries={data.total}
      isFetching={isFetching}
    />
  );
}
