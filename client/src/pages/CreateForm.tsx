import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { KeyboardSensor, PointerSensor } from '../lib/dndKitSensors';
import FormElements from '../components/create-form/FormElements';
import {
  FormElementButton,
  FormElementButtonProps,
} from '../components/create-form/DraggableButton';
import { useState } from 'react';
import FormPlayground from '../components/create-form/FormPlayground';
import Input from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { EyeIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/AlertDialog';

export interface FormElementsType {
  id: number;
  label: string;
  type: string;
  required: boolean;
}

export default function CreateForm() {
  const [activeButton, setActiveButton] =
    useState<FormElementButtonProps | null>(null);

  const [formElements, setFormElements] = useState<FormElementsType[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={e => setActiveButton(e.active.data.current?.element)}
      onDragCancel={() => setActiveButton(null)}
      onDragEnd={({ over, active }) => {
        setActiveButton(null);
        if (!over) return;
        setFormElements(formElements => [
          ...formElements,
          {
            id: Math.random() * 1000,
            label: active.data.current?.element.text as string,
            type: active.id as string,
            required: false,
          },
        ]);
      }}
    >
      <div className="flex gap-12">
        <FormElements />
        <form className="flex flex-grow flex-col">
          <section className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <label className="font-medium">Form Name:</label>
              <Input required placeholder="Enter form name" />
            </div>
            <Button
              type="button"
              variant="ghost"
              className="gap-2 text-primary hover:text-primary"
            >
              <EyeIcon className="h-5 w-5" />
              <span>Preview</span>
            </Button>
          </section>
          <FormPlayground
            formElements={formElements}
            setFormElements={setFormElements}
          />
          <section className="mt-5 space-x-5 self-end">
            {formElements.length !== 0 ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="destructive">
                    Clear Form
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear Form?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to clear the form? This action is
                      irreversible and will permanently remove all the progress
                      in the current form.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="sm:space-x-4">
                    <AlertDialogAction
                      onClick={() => {
                        setFormElements([]);
                      }}
                    >
                      Yes, clear form
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
            <Button>Save Form</Button>
          </section>
        </form>
      </div>
      <DragOverlay
        modifiers={[restrictToWindowEdges]} /* dropAnimation={null} */
      >
        {activeButton ? (
          <FormElementButton className="cursor-grabbing" {...activeButton} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
