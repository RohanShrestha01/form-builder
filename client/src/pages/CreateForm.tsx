import { DndContext, DragOverlay } from '@dnd-kit/core';

import FormElements from '../components/create-form/FormElements';
import {
  FormElementButton,
  FormElementButtonProps,
} from '../components/create-form/DraggableButton';
import { useState } from 'react';
import FormPlayground from '../components/create-form/FormPlayground';

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
        <FormPlayground />
      </div>
      <DragOverlay>
        {activeButton ? <FormElementButton {...activeButton} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
