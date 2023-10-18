import { ChevronRightIcon } from 'lucide-react';
import CreateForm from './CreateForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import type { FormType } from '../types';
import LoadingSvg from '../assets/loading.svg';
import Error from './Error';
import { useFormPlaygroundStore } from '../stores/formPlaygroundStore';

export default function UpdateForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const setFormElements = useFormPlaygroundStore(
    state => state.setFormElements,
  );

  const { data, isPending, isError } = useQuery<FormType>({
    queryKey: ['forms', id],
    queryFn: () => axiosPrivate('/forms/' + id).then(res => res.data.data.form),
  });

  if (isPending)
    return (
      <img
        src={LoadingSvg}
        alt="Loading Spinner"
        className="mx-auto mt-8 h-20"
      />
    );

  if (isError) return <Error fullScreen={false} />;

  setFormElements(data.elements);

  return (
    <div>
      <nav className="mb-3 text-[15px] font-medium">
        <ol className="flex items-center gap-1">
          <li
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => navigate('/my-forms')}
          >
            My Forms
          </li>
          <li>
            <ChevronRightIcon className="h-5" />
          </li>
          <li>{data.name}</li>
          <li>
            <ChevronRightIcon className="h-5" />
          </li>
          <li>Edit</li>
        </ol>
      </nav>
      <CreateForm formType="edit" form={data} />
    </div>
  );
}
