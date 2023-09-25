import { CircleIcon, PlusIcon, XIcon } from 'lucide-react';
import { Checkbox } from '../ui/Checkbox';
import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { useState } from 'react';
import Tooltip from '../ui/Tooltip';

export default function Options({ type }: { type: string }) {
  const [options, setOptions] = useState(['Option 1', 'Option 2']);

  return (
    <ul className="space-y-3">
      {options.map((option, i) => (
        <li className="flex items-center gap-4" key={option + '-' + i}>
          <div>
            {type === 'checklist' ? (
              <Checkbox />
            ) : type === 'multi-choice' ? (
              <CircleIcon className="h-4 w-4 opacity-50" />
            ) : (
              <span className="text-sm">{i + 1}.</span>
            )}
          </div>
          <Input
            className="h-8 rounded-none border-0 border-b px-0 shadow-none"
            defaultValue={option}
            onFocus={e => e.target.select()}
          />
          {options.length > 1 ? (
            <Tooltip asChild title="Remove">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full"
                onClick={() =>
                  setOptions(prev => prev.filter((_, j) => i !== j))
                }
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </Tooltip>
          ) : null}
        </li>
      ))}
      <li>
        <Button
          type="button"
          variant="ghost"
          className="gap-2"
          onClick={() =>
            setOptions(prev => [...prev, 'Option ' + (options.length + 1)])
          }
        >
          <PlusIcon className="h-5 w-5" />
          <span>Add option</span>
        </Button>
      </li>
    </ul>
  );
}
