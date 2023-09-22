import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';

import Input from '../ui/Input';
import { Button } from '../ui/Button';
import { FormElementsType } from './FormPlayground';
import Tooltip from '../ui/Tooltip';

interface Props {
  formElement: FormElementsType;
}

export default function FormElementCard({ formElement }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: formElement.id });

  const cardStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <article
      className={`relative flex gap-2 rounded-md bg-white py-3 pl-2 pr-4 shadow ${
        isDragging ? 'z-10' : ''
      }`}
      ref={setNodeRef}
      style={cardStyle}
    >
      <div
        className={`flex cursor-move items-center rounded px-2 ${
          isDragging ? 'bg-muted' : 'hover:bg-muted'
        }`}
        {...listeners}
        {...attributes}
      >
        <GripVerticalIcon className="h-7 w-7 text-muted-foreground transition-colors duration-200" />
      </div>
      <div className="flex-grow space-y-0.5 pb-2">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">What is your name?</h1>
          <Tooltip asChild title="Delete">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-destructive/5"
            >
              <Trash2Icon className="h-5 w-5 text-destructive" />
            </Button>
          </Tooltip>
        </div>
        <Input placeholder="Enter your name" />
      </div>
    </article>
  );
}
