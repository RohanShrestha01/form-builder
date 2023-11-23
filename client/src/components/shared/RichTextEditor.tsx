import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SquareCodeIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { Separator } from '../ui/Separator';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { useState } from 'react';
import Tooltip from '../ui/Tooltip';
import { ScrollArea } from '../ui/ScrollArea';
import type { ControllerRenderProps, FieldValues } from 'react-hook-form';

const extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'leading-7',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'bg-muted rounded p-1 box-decoration-clone',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'text-sm',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: '[&>li>p]:my-1',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: '[&>li>p]:my-1',
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: 'my-6 rounded-full',
      },
    },
  }),
  Underline,
  Placeholder.configure({ placeholder: 'Write something …' }),
  Typography,
];

interface Props {
  className?: string;
  editor: Editor | null;
}

const EditorToolbar = ({ className = '', editor }: Props) => {
  if (!editor) return <div className="h-[45px]" />;

  const selectValue = editor.isActive('paragraph')
    ? 'paragraph'
    : editor.isActive('heading', { level: 1 })
    ? '1'
    : editor.isActive('heading', { level: 2 })
    ? '2'
    : editor.isActive('heading', { level: 3 })
    ? '3'
    : undefined;

  return (
    <div
      className={`flex flex-wrap items-center gap-2 border-b px-2 py-1 ${className}`}
    >
      <Tooltip title="Undo" asChild>
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="px-2"
          >
            <Undo2Icon className="h-4 w-4" />
          </Button>
        </div>
      </Tooltip>
      <Tooltip title="Redo" asChild>
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="px-2"
          >
            <Redo2Icon className="h-4 w-4" />
          </Button>
        </div>
      </Tooltip>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Select
        value={selectValue}
        onValueChange={value => {
          if (value === 'paragraph')
            editor.chain().focus().setParagraph().run();
          else
            editor
              .chain()
              .focus()
              .toggleHeading({ level: Number(value) as 1 | 2 | 3 })
              .run();
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="1">Heading 1</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Tooltip title="Bold" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <BoldIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Tooltip title="Italic" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <ItalicIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Tooltip title="Underline" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('underline')}
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Tooltip title="Strikethrough" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('strike')}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          >
            <StrikethroughIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Tooltip title="Blockquote" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('blockquote')}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
          >
            <QuoteIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Tooltip title="Code" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('code')}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
          >
            <Code2Icon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Tooltip title="Code block" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('codeBlock')}
            onPressedChange={() =>
              editor.chain().focus().toggleCodeBlock().run()
            }
          >
            <SquareCodeIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Tooltip title="Bullet list" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('bulletList')}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <ListIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Tooltip title="Ordered list" asChild>
        <div>
          <Toggle
            size="sm"
            pressed={editor.isActive('orderedList')}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrderedIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </Tooltip>
      <Separator orientation="vertical" className="mx-1 h-7" />
      <Tooltip title="Horizontal line" asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MinusIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
      <Tooltip title="Clear formatting" asChild>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          className="px-2"
        >
          <RemoveFormattingIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </div>
  );
};

interface EditorProps {
  field?: ControllerRenderProps<FieldValues, string>;
}

export default function RichTextEditor({ field }: EditorProps) {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          'outline-none px-3 py-2 h-48 prose prose-sm prose-slate max-w-none prose-p:my-0',
      },
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    content: field?.value,
    onUpdate: ({ editor }) => {
      if (!field) return;
      const content = editor.getHTML();
      field.onChange(content === '<p></p>' ? '' : content);
    },
  });

  // if (!field?.value) editor?.commands.clearContent();

  return (
    <article
      className={`group rounded-md border shadow-sm ${
        isFocused ? 'border-primary' : 'hover:border-ring'
      }`}
    >
      <EditorToolbar
        editor={editor}
        className={isFocused ? 'border-primary' : 'group-hover:border-ring'}
      />
      <ScrollArea className="h-48">
        <EditorContent editor={editor} />
      </ScrollArea>
    </article>
  );
}
