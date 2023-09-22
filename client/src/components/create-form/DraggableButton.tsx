import type { LucideIcon } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

import { Button } from '../ui/Button';

export interface FormElementButtonProps {
  text: string;
  Icon: LucideIcon | ((props: { className: string }) => JSX.Element);
}

export const FormElementButton = ({
  text,
  Icon,
  className = '',
}: FormElementButtonProps & { className?: string }) => (
  <Button
    variant="secondary"
    className={`w-full gap-3 transition-all duration-200 hover:shadow ${className}`}
  >
    <Icon className="h-[18px] w-[18px]" />
    <span>{text}</span>
  </Button>
);

export default function DraggableButton(props: FormElementButtonProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.text.toLowerCase().replace(' ', '-'),
    data: { element: props },
  });

  return (
    <li
      className={isDragging ? 'opacity-50' : 'opacity-100'}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <FormElementButton className="cursor-grab" {...props} />
    </li>
  );
}
