import {
  CalendarDaysIcon,
  CalendarRangeIcon,
  CheckSquareIcon,
  ChevronDownCircleIcon,
  ClockIcon,
  HeadingIcon,
  // ImageIcon,
  ListTodoIcon,
  // PaperclipIcon,
  PencilLineIcon,
  TextIcon,
  ToggleRightIcon,
  TypeIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import {
  ListSearchSvg,
  ListSvg,
  NumberSvg,
  TextEditStyleSvg,
} from '../../assets/icons/Svgs';
import { ScrollArea } from '../ui/ScrollArea';
import SearchInput from '../shared/SearchInput';
import DraggableButton from './DraggableButton';

const elementGroups = [
  {
    title: 'Layout Elements',
    elements: [
      {
        text: 'Heading',
        Icon: HeadingIcon,
      },
      {
        text: 'Description',
        Icon: PencilLineIcon,
      },
    ],
  },
  {
    title: 'Text Elements',
    elements: [
      {
        text: 'Single Line',
        Icon: TypeIcon,
      },
      {
        text: 'Number',
        Icon: NumberSvg,
      },
      {
        text: 'Multi-line',
        Icon: TextIcon,
      },
      {
        text: 'Rich Text',
        Icon: TextEditStyleSvg,
      },
    ],
  },
  {
    title: 'Multi Elements',
    elements: [
      {
        text: 'Checklist',
        Icon: ListTodoIcon,
      },
      {
        text: 'Multi-choice',
        Icon: ListSvg,
      },
      {
        text: 'Dropdown',
        Icon: ChevronDownCircleIcon,
      },
      {
        text: 'Combobox',
        Icon: ListSearchSvg,
      },
      {
        text: 'Checkbox',
        Icon: CheckSquareIcon,
      },
      {
        text: 'Switch',
        Icon: ToggleRightIcon,
      },
    ],
  },
  {
    title: 'Date Elements',
    elements: [
      {
        text: 'Date',
        Icon: CalendarDaysIcon,
      },
      {
        text: 'Date Range',
        Icon: CalendarRangeIcon,
      },
      {
        text: 'Time',
        Icon: ClockIcon,
      },
    ],
  },
  /* {
    title: 'Media Elements',
    elements: [
      {
        text: 'Attachments',
        Icon: PaperclipIcon,
      },
      {
        text: 'Image',
        Icon: ImageIcon,
      },
    ],
  }, */
];

interface Props {
  isUpdate?: boolean;
}

export default function FormElements({ isUpdate }: Props) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [parent] = useAutoAnimate();

  const filteredElementGroups = elementGroups.map(({ elements, title }, i) => {
    const filteredElements = elements.filter(({ text }) =>
      text.toLowerCase().includes(query.toLowerCase()),
    );

    if (filteredElements.length > 0)
      return (
        <article key={i}>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <ul className="mt-3 grid grid-cols-2 gap-4" ref={parent}>
            {filteredElements.map(({ text, Icon }, i) => (
              <DraggableButton text={text} Icon={Icon} key={i} />
            ))}
          </ul>
        </article>
      );
    else return null;
  });

  return (
    <ScrollArea
      className={`${
        isUpdate ? 'h-[calc(100vh-139px)]' : 'h-[calc(100vh-104px)]'
      } shrink-0 pr-[26px]`}
    >
      <aside className="relative w-80">
        <section className="sticky top-0 z-10 space-y-5 bg-white pb-5">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">Form Elements</h1>
            <h2 className="text-sm text-muted-foreground">
              Drag elements to the right
            </h2>
          </div>
          <SearchInput placeholder="Search Elements" />
        </section>
        <section className="flex flex-col gap-6" ref={parent}>
          {filteredElementGroups.every(element => element === null) ? (
            <p className="text-center text-sm font-medium text-muted-foreground">
              No results found
            </p>
          ) : (
            filteredElementGroups
          )}
        </section>
      </aside>
    </ScrollArea>
  );
}
