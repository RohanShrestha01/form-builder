import { type InputHTMLAttributes, forwardRef } from 'react';
import Input from '../ui/Input';
import { cn } from '../../lib/utils';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, label, errorMessage, ...props }, ref) => {
    return (
      <div className="flex flex-col-reverse gap-2">
        {errorMessage ? (
          <span className="text-danger text-xs">{errorMessage}</span>
        ) : null}
        <Input ref={ref} className="peer" {...props} />
        <label
          htmlFor={props.name}
          className={cn(
            'text-muted-foreground peer-focus-visible:text-foreground space-x-1 text-sm font-medium peer-disabled:opacity-50',
            className,
          )}
        >
          <span>{label}</span>
          {props.required ? <span className="text-danger">*</span> : null}
        </label>
      </div>
    );
  },
);

InputField.displayName = 'Input Field';

export default InputField;
