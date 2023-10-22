import * as React from 'react';
import { CalendarDaysIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  field?: ControllerRenderProps<FieldValues, string>;
}

export function DateRangePicker({ className, field }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  React.useEffect(() => {
    setDate(field?.value ?? null);
  }, [field?.value]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
            <CalendarDaysIcon className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            captionLayout="dropdown-buttons"
            fromYear={1960}
            toYear={2030}
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={value => {
              setDate(value);
              field?.onChange(value);
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
