import {
  CalendarDaysIcon,
  CheckSquareIcon,
  ChevronDownCircleIcon,
  ClockIcon,
  HeadingIcon,
  ImageIcon,
  ListTodoIcon,
  PaperclipIcon,
  PencilLineIcon,
  TextIcon,
  ToggleRightIcon,
  TypeIcon,
} from 'lucide-react';
import SearchInput from '../components/shared/SearchInput';
import { Button } from '../components/ui/Button';
import {
  ListSearchSvg,
  ListSvg,
  NumberSvg,
  TextEditStyleSvg,
} from '../assets/icons/Svgs';
import { ScrollArea } from '../components/ui/ScrollArea';

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
        text: 'Time',
        Icon: ClockIcon,
      },
    ],
  },
  {
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
  },
];

export default function CreateForm() {
  return (
    <div className="flex gap-12">
      <ScrollArea className="h-[calc(100vh-104px)] pr-[26px]">
        <aside className="relative w-80">
          <section className="sticky top-0 space-y-5 bg-white pb-5">
            <div className="space-y-1">
              <h1 className="text-lg font-semibold">Form Elements</h1>
              <h2 className="text-sm text-muted-foreground">
                Drag elements to the right
              </h2>
            </div>
            <SearchInput placeholder="Search Components" />
          </section>
          <section className="space-y-6">
            {elementGroups.map(({ elements, title }, i) => (
              <article key={i} className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {elements.map(({ text, Icon }, i) => (
                    <Button
                      variant="secondary"
                      key={i}
                      className="cursor-grab gap-3 transition-all duration-200 hover:shadow"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                      <span>{text}</span>
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </section>
        </aside>
      </ScrollArea>
      <div className="flex-grow"></div>
    </div>
  );
}
