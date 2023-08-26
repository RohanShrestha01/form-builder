import * as React from 'react';

import Input from '../ui/Input';
import { cn } from '../../lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col-reverse gap-2">
        {errorMessage ? (
          <span className="text-destructive text-xs">{errorMessage}</span>
        ) : null}
        <Input ref={ref} className="peer" {...props} />
        <label
          htmlFor={props.name}
          className={cn(
            'space-x-1 text-sm font-medium leading-none text-muted-foreground peer-focus-visible:text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            className,
          )}
        >
          <span>{label}</span>
          {props.required ? <span className="text-destructive">*</span> : null}
        </label>
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
