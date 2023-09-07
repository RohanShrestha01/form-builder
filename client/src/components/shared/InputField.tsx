import * as React from 'react';

import Input from '../ui/Input';
import { cn } from '../../lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  showRequired?: boolean;
}

const InputField = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, errorMessage, showRequired, ...props }, ref) => {
    return (
      <div className="flex flex-col-reverse justify-end gap-2">
        {errorMessage ? (
          <span className="text-xs text-destructive">{errorMessage}</span>
        ) : null}
        <Input ref={ref} className="peer" {...props} />
        <label
          htmlFor={props.name}
          className={cn(
            'space-x-1 text-sm font-medium leading-none text-muted-foreground peer-hover:text-foreground peer-focus-visible:text-primary peer-disabled:opacity-70',
            className,
          )}
        >
          <span>{label}</span>
          {showRequired ? <span className="text-destructive">*</span> : null}
        </label>
      </div>
    );
  },
);

InputField.displayName = 'InputField';

export default InputField;
