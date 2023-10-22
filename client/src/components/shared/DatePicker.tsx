import * as React from 'react';
import { CalendarDaysIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';

interface Props {
  field?: ControllerRenderProps<FieldValues, string>;
  required?: boolean;
}

export function DatePicker({ field, required = false }: Props) {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    setDate(field?.value ?? null);
  }, [field?.value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
          <CalendarDaysIcon className="ml-auto h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          captionLayout="dropdown-buttons"
          fromYear={1960}
          toYear={2030}
          mode="single"
          selected={date}
          onSelect={value => {
            setDate(value);
            field?.onChange(value);
          }}
          initialFocus
          required={required}
        />
      </PopoverContent>
    </Popover>
  );
}
