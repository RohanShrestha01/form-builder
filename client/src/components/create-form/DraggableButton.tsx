import type { LucideIcon } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

import { Button } from '../ui/Button';

export interface FormElementButtonProps {
  text: string;
  Icon: LucideIcon | ((props: { className: string }) => JSX.Element);
}

export const FormElementButton = ({ text, Icon }: FormElementButtonProps) => (
  <Button
    variant="secondary"
    className="w-full cursor-grab gap-3 transition-all duration-200 hover:shadow"
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
      style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <FormElementButton {...props} />
    </li>
  );
}
