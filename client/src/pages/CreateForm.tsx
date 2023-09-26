import { useLocation } from 'react-router-dom';
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
import { EyeIcon, LockIcon } from 'lucide-react';
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
import { useFormPlaygroundStore } from '../stores/formPlaygroundStore';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import DemoInfoCard from '../components/create-form/DemoInfoCard';

export default function CreateForm() {
  const { pathname } = useLocation();
  const isDemo = pathname === '/demo';

  const [formName, setFormName] = useState('');
  const [activeButton, setActiveButton] =
    useState<FormElementButtonProps | null>(null);
  const [isDropped, setIsDropped] = useState(false);

  const addFormElement = useFormPlaygroundStore(state => state.addFormElement);
  const removeAllFormElements = useFormPlaygroundStore(
    state => state.removeAllFormElements,
  );
  const formElements = useFormPlaygroundStore(state => state.formElements);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const axiosPrivate = useAxiosPrivate();
  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      axiosPrivate.post('/forms', {
        name: formName,
        elements: formElements,
      }),
    onSuccess: () => {
      setFormName('');
      removeAllFormElements();
      toast.success('Form created successfully');
    },
    onError: () => toast.error('Error creating form'),
  });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={e => {
        setActiveButton(e.active.data.current?.element);
        setIsDropped(false);
      }}
      onDragCancel={() => {
        setActiveButton(null);
        setIsDropped(false);
      }}
      onDragEnd={({ over, active }) => {
        setActiveButton(null);
        if (!over) return;
        addFormElement(
          active.data.current?.element.text as string,
          active.id as string,
        );
        setIsDropped(true);
      }}
    >
      <div className="flex gap-12">
        <FormElements />
        <form
          className="flex flex-grow flex-col"
          onSubmit={e => {
            e.preventDefault();
            mutate();
          }}
        >
          <section className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <label className="font-medium">Form Name:</label>
              <Input
                required
                placeholder="Enter form name"
                value={formName}
                onChange={e => setFormName(e.target.value)}
              />
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
            isDropped={isDropped}
            resetIsDropped={() => setIsDropped(false)}
          />
          <section className="mt-5 flex items-center gap-5 self-end">
            {isDemo && <DemoInfoCard />}
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
                    <AlertDialogAction onClick={removeAllFormElements}>
                      Yes, clear form
                    </AlertDialogAction>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : null}
            <Button
              disabled={isDemo}
              isLoading={isLoading}
              className={isDemo ? 'gap-2.5' : ''}
            >
              {isDemo && <LockIcon className="h-[18px] w-[18px]" />}
              <span>Save Form</span>
            </Button>
          </section>
        </form>
      </div>
      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeButton ? (
          <FormElementButton className="cursor-grabbing" {...activeButton} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
