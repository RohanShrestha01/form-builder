import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { Button } from '../components/ui/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/AlertDialog';
import type { FormType } from '../types';
import axios from '../lib/axios';
import LoadingSvg from '../assets/loading.svg';
import Error from './Error';
import useTitle from '../hooks/useTitle';
import FormElementCard from '../components/create-form/FormElementCard';
import { Form, FormControl, FormField, FormItem } from '../components/ui/Form';

interface Props {
  onClear: () => void;
  disabled?: boolean;
}

const ClearFormButton = ({ onClear, disabled = false }: Props) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        className="text-primary hover:bg-slate-300/25 hover:text-primary"
      >
        Clear Form
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Clear Form?</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to clear the form? This action is irreversible
          and will permanently remove all the progress in the current form.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="sm:space-x-4">
        <AlertDialogAction onClick={onClear} type="reset">
          Yes, clear form
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default function GeneratedForm() {
  const { id } = useParams();

  const { data, isPending, isError } = useQuery<FormType>({
    queryKey: ['forms', id],
    queryFn: () => axios('/forms/' + id).then(res => res.data.data.form),
  });

  useTitle(data?.name || 'Form Builder');

  const form = useForm();

  useEffect(() => {
    if (!data) return;
    const defaultValues: { [x: string]: unknown } = {};
    data.elements.forEach(({ id, type }) => {
      if (['switch', 'checkbox'].includes(type)) defaultValues[id] = false;
      else if (type === 'checklist') defaultValues[id] = [];
      else defaultValues[id] = null;
    });
    form.reset(defaultValues);
  }, [data, form]);

  const onSubmit = (values: { [x: string]: string }) => {
    if (!data) return;

    for (const { id, required, type } of data.elements) {
      if (
        required &&
        (!values[id] || (type === 'checklist' && values[id].length === 0))
      ) {
        toast.error('Please fill all required fields');
        return;
      }
    }

    console.log(
      data.elements.map(({ id, label, options, type }) => ({
        question: label,
        answer:
          options && type !== 'checklist'
            ? options.find(({ value }) => value === values[id])?.label ?? null
            : values[id] ?? null,
      })),
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex min-h-[100dvh] flex-col bg-muted"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <header className="fixed left-0 right-0 top-0 z-30 border-b bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6">
            <Link to="/">
              <h1 className="font-cursive text-3xl font-bold text-primary">
                Form Builder
              </h1>
            </Link>
            <div className="flex gap-6">
              <ClearFormButton
                disabled={isPending}
                onClear={() => form.reset()}
              />
              <Button disabled={isPending}>Submit Form</Button>
            </div>
          </div>
        </header>
        {isPending ? (
          <img
            src={LoadingSvg}
            alt="Loading Spinner"
            className="mx-auto mt-24 h-20"
          />
        ) : isError ? (
          <div className="mt-24">
            <Error fullScreen={false} />
          </div>
        ) : (
          <main className="mx-auto mt-16 h-full w-full max-w-[720px] p-5">
            <ul className="space-y-5">
              <li className="rounded-md bg-background px-5 py-3 text-2xl font-medium">
                {data.name}
              </li>
              {data.elements.map(element => (
                <li key={element.id}>
                  <FormField
                    control={form.control}
                    name={element.id}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FormElementCard
                            formElement={element}
                            isView
                            field={field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </li>
              ))}
              <li className="flex justify-between">
                <ClearFormButton onClear={() => form.reset()} />
                <Button>Submit Form</Button>
              </li>
            </ul>
          </main>
        )}
      </form>
    </Form>
  );
}
