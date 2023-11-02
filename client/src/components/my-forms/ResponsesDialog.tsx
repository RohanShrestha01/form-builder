import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Error from '../../pages/Error';
import LoadingSvg from '@/assets/loading.svg';
import Input from '../ui/Input';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { ScrollArea } from '../ui/ScrollArea';
import { useState } from 'react';
import BubbleMenuEditor from '../shared/BubbleMenuEditor';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type FormResponseType = {
  createdAt: string;
  form: string;
  response: {
    elementType: string;
    question: string;
    answer: any;
    _id: string;
  }[];
  updatedAt: string;
  _id: string;
};

interface Props {
  children: React.ReactNode;
  formId: string;
  closeHandler: () => void;
}

export default function ResponsesDialog({
  children,
  formId,
  closeHandler,
}: Props) {
  const axiosPrivate = useAxiosPrivate();

  const { data, isPending, isError } = useQuery<FormResponseType[]>({
    queryKey: ['forms', formId, 'responses'],
    queryFn: () =>
      axiosPrivate('/forms/' + formId + '/responses').then(
        res => res.data.data.responses,
      ),
  });

  const [responseNum, setResponseNum] = useState(1);

  return (
    <Dialog
      onOpenChange={open => {
        if (!open) closeHandler();
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="gap-0">
        {isPending ? (
          <img
            src={LoadingSvg}
            alt="Loading Spinner"
            className="mx-auto my-8 h-20"
          />
        ) : isError ? (
          <div className="mx-6 mb-10">
            <Error fullScreen={false} />
          </div>
        ) : data.length === 0 ? (
          <DialogHeader className="space-y-3">
            <DialogTitle>{data.length} Responses</DialogTitle>
            <DialogDescription>
              No responses received till now
            </DialogDescription>
          </DialogHeader>
        ) : (
          <>
            <DialogHeader className="space-y-4">
              <DialogTitle>{data.length} Responses</DialogTitle>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-full p-0"
                    onClick={() => {
                      setResponseNum(prev => prev - 1);
                    }}
                    disabled={responseNum === 1}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    className="h-8 w-12 rounded-none border-x-0 border-t-0 px-0 text-right shadow-none"
                    min="1"
                    max={data.length}
                    value={responseNum}
                    onChange={e => {
                      const num = Number(e.target.value);
                      if (num < 1 || num > data.length) return;
                      setResponseNum(num);
                    }}
                    onFocus={e => e.target.select()}
                  />
                  <span>of {data.length}</span>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 rounded-full p-0"
                    onClick={() => {
                      setResponseNum(prev => prev + 1);
                    }}
                    disabled={responseNum === data.length}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm font-medium">
                  {dayjs(data[responseNum - 1].createdAt).fromNow()}
                </span>
              </div>
            </DialogHeader>
            <ScrollArea className="mt-6 h-96">
              <ol className="mx-6 mb-2 list-decimal space-y-4">
                {data[responseNum - 1].response.map(
                  ({ answer, _id, elementType, question }) =>
                    answer !== undefined &&
                    answer !== null && (
                      <li key={_id} className="space-y-1">
                        <BubbleMenuEditor readOnly content={question} />
                        <div className="rounded-md border px-2 py-1 text-[15px]">
                          {elementType === 'multi-line' ? (
                            <pre className="font-sans">{answer}</pre>
                          ) : elementType === 'checklist' ? (
                            answer.length === 0 ? (
                              '-'
                            ) : (
                              <ul className="list-disc px-5">
                                {answer.map((item: string, i: number) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            )
                          ) : elementType === 'date' ? (
                            format(new Date(answer), 'PPP')
                          ) : elementType === 'date-range' ? (
                            answer.to ? (
                              <p>
                                {format(new Date(answer.from), 'LLL dd, y')} -{' '}
                                {format(new Date(answer.to), 'LLL dd, y')}
                              </p>
                            ) : (
                              format(new Date(answer.from), 'LLL dd, y')
                            )
                          ) : elementType === 'rich-text' ? (
                            <BubbleMenuEditor content={answer} readOnly />
                          ) : elementType === 'switch' ||
                            elementType === 'checkbox' ? (
                            answer ? (
                              'Yes'
                            ) : (
                              'No'
                            )
                          ) : (
                            answer
                          )}
                        </div>
                      </li>
                    ),
                )}
              </ol>
            </ScrollArea>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
