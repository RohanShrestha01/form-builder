import {
  DndContext,
  type DragEndEvent,
  useDroppable,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToParentElement } from '@dnd-kit/modifiers';

import FormElementCard from './FormElementCard';
import { KeyboardSensor, PointerSensor } from '../../lib/dndKitSensors';
import { FormElementsType } from '../../pages/CreateForm';
import { ScrollArea } from '../ui/ScrollArea';

interface Props {
  formElements: FormElementsType[];
  setFormElements: React.Dispatch<React.SetStateAction<FormElementsType[]>>;
}

export default function FormPlayground({
  formElements,
  setFormElements,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'droppable',
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      modifiers={[restrictToParentElement]}
      onDragEnd={handleDragEnd}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
    >
      <SortableContext
        items={formElements}
        strategy={verticalListSortingStrategy}
      >
        <section
          ref={setNodeRef}
          className={`flex-grow rounded-lg border-2 border-dashed bg-muted/25 py-5 pl-5 ${
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
            <ScrollArea className="h-[calc(100vh-252px)]">
              <ul className="space-y-5 pr-5">
                {formElements.map(element => (
                  <FormElementCard
                    key={element.id}
                    formElement={element}
                    deleteHandler={id => {
                      setFormElements(formElements =>
                        formElements.filter(
                          formElement => formElement.id !== id,
                        ),
                      );
                    }}
                  />
                ))}
              </ul>
            </ScrollArea>
          )}
        </section>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over) return;

    if (active.id !== over.id) {
      setFormElements(formElements => {
        const oldIndex = active.data.current?.sortable.index as number;
        const newIndex = over.data.current?.sortable.index as number;

        return arrayMove(formElements, oldIndex, newIndex);
      });
    }
  }
}
