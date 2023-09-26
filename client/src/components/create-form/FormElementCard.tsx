import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import {
  type AnimateLayoutChanges,
  useSortable,
  defaultAnimateLayoutChanges,
} from '@dnd-kit/sortable';

import Input from '../ui/Input';
import { Button } from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import { Switch } from '../ui/Switch';
import { Label } from '../ui/Label';
import { Separator } from '../ui/Separator';
import { Textarea } from '../ui/Textarea';
import RichTextEditor from '../shared/RichTextEditor';
import BubbleMenuEditor from '../shared/BubbleMenuEditor';
import { Checkbox } from '../ui/Checkbox';
import { DatePicker } from '../shared/DatePicker';
import { DateRangePicker } from '../shared/DateRangePicker';
import Options from './Options';
import {
  type FormElementsType,
  useFormPlaygroundStore,
} from '../../stores/formPlaygroundStore';

const animateLayoutChanges: AnimateLayoutChanges = args => {
  const { isSorting, wasDragging } = args;
  if (isSorting || wasDragging) return defaultAnimateLayoutChanges(args);
  return true;
};

interface Props {
  formElement: FormElementsType;
}

export default function FormElementCard({ formElement }: Props) {
  const { id, label, type, required } = formElement;
  const removeFormElement = useFormPlaygroundStore(
    state => state.removeFormElement,
  );
  const toggleRequired = useFormPlaygroundStore(state => state.toggleRequired);
  const updateLabel = useFormPlaygroundStore(state => state.updateLabel);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, animateLayoutChanges });

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
      <div className="flex-grow space-y-2 pb-2">
        <div className="flex items-center gap-8">
          <div className="flex w-full items-center gap-5">
            {type === 'switch' ? (
              <Switch />
            ) : type === 'checkbox' ? (
              <Checkbox />
            ) : null}
            <BubbleMenuEditor
              placeholder={
                ['heading', 'description'].includes(type)
                  ? label
                  : 'Question or Text'
              }
              content={label}
              updateHandler={html => {
                updateLabel(id, html);
              }}
            />
          </div>
          <div className="flex items-center">
            {['heading', 'description', 'switch', 'checkbox'].includes(
              type,
            ) ? null : (
              <div className="flex items-center gap-2">
                <Switch
                  id={'required-' + id}
                  checked={required}
                  onCheckedChange={() => toggleRequired(id)}
                />
                <Label
                  className="cursor-pointer font-normal"
                  htmlFor={'required-' + id}
                >
                  Required
                </Label>
              </div>
            )}
            <Separator orientation="vertical" className="mx-4 h-7" />
            <Tooltip asChild title="Delete">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-destructive/5"
                onClick={() => {
                  removeFormElement(id);
                }}
              >
                <Trash2Icon className="h-5 w-5 text-destructive" />
              </Button>
            </Tooltip>
          </div>
        </div>
        {type === 'single-line' ? (
          <Input placeholder="Single line text" />
        ) : type === 'number' ? (
          <Input type="number" placeholder="Number" />
        ) : type === 'multi-line' ? (
          <Textarea placeholder="Multi line text..." />
        ) : type === 'rich-text' ? (
          <RichTextEditor />
        ) : ['checklist', 'multi-choice', 'dropdown', 'combobox'].includes(
            type,
          ) ? (
          <Options type={type} id={id} />
        ) : type === 'date' ? (
          <DatePicker />
        ) : type === 'date-range' ? (
          <DateRangePicker />
        ) : type === 'time' ? (
          <Input type="time" className="w-32" />
        ) : type === 'attachments' ? (
          <Input type="file" className="pt-1.5 text-muted-foreground" />
        ) : type === 'image' ? (
          <Input
            type="file"
            accept="image/*"
            className="pt-1.5 text-muted-foreground"
          />
        ) : null}
      </div>
    </article>
  );
}
