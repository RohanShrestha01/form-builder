import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges, snapCenterToCursor } from '@dnd-kit/modifiers';

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

export default function CreateForm() {
  const [activeButton, setActiveButton] =
    useState<FormElementButtonProps | null>(null);

  return (
    <DndContext
      onDragStart={e => setActiveButton(e.active.data.current?.element)}
      onDragCancel={() => setActiveButton(null)}
      onDragEnd={() => setActiveButton(null)}
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
          <FormPlayground />
          <section className="mt-5 space-x-5 self-end">
            <Button type="reset" variant="destructive">
              Clear Form
            </Button>
            <Button>Save Form</Button>
          </section>
        </form>
      </div>
      <DragOverlay
        modifiers={[
          restrictToWindowEdges,
          snapCenterToCursor,
        ]} /* dropAnimation={null} */
      >
        {activeButton ? (
          <FormElementButton className="cursor-grabbing" {...activeButton} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
