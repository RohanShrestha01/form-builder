import { useState } from 'react';
import { type PaginationState } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';

import { columns } from '../components/my-forms/columns';
import { DataTable } from '../components/shared/data-table/DataTable';
import useTitle from '../hooks/useTitle';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function MyForms() {
  useTitle('My Forms | Form Builder');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['forms'],
    queryFn: () => axiosPrivate('/forms').then(res => res.data.data),
  });

  if (isLoading || isError) return;

  return (
    <DataTable
      columns={columns}
      data={data.forms}
      totalEntries={100}
      pagination={pagination}
      paginationChangeHandler={setPagination}
      isFetching={isFetching}
    />
  );
}
