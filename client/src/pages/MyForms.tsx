import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { columns } from '../components/my-forms/columns';
import { DataTable } from '../components/shared/data-table/DataTable';
import useTitle from '../hooks/useTitle';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import type { FormType, PaginatedResponseType } from '../types';

interface FormsResponseType extends PaginatedResponseType {
  forms: FormType[];
}

export default function MyForms() {
  useTitle('My Forms | Form Builder');
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();

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
