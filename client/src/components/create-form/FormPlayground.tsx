import { DndContext, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import FormElementCard from './FormElementCard';
import { KeyboardSensor, PointerSensor } from '../../lib/dndKitSensors';

const formElements = [
  {
    id: 1,
    label: 'Single Line',
    type: 'single-line',
    required: false,
  },
  {
    id: 2,
    label: 'Multi-line',
    type: 'multi-line',
    required: false,
  },
];

export type FormElementsType = (typeof formElements)[0];

export default function FormPlayground() {
  const { setNodeRef, isOver, active } = useDroppable({
    id: 'droppable',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext sensors={sensors} modifiers={[restrictToParentElement]}>
      <SortableContext
        items={formElements}
        strategy={verticalListSortingStrategy}
      >
        <section
          ref={setNodeRef}
          className={`flex-grow rounded-lg border-2 border-dashed bg-muted/25 p-5 ${
            isOver ? 'border-muted-foreground' : 'border-slate-300'
          }`}
        >
          {formElements.length === 0 ? (
            <p
              className={`flex h-full items-center justify-center font-medium ${
                isOver ? 'text-slate-700' : 'text-muted-foreground'
              }`}
            >
              {isOver
                ? 'Drop the element here ...'
                : 'Drag a element from the right to this area'}
            </p>
          ) : (
            <ul className="space-y-5">
              {formElements.map((element, i) => (
                <FormElementCard key={i} formElement={element} />
              ))}
            </ul>
          )}
        </section>
      </SortableContext>
    </DndContext>
  );
}
