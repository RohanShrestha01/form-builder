import { useState } from 'react';
import {
  BubbleMenu,
  type Editor,
  EditorContent,
  useEditor,
  FloatingMenu,
} from '@tiptap/react';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
} from 'lucide-react';

import { Button } from '../ui/Button';
import { Toggle } from '../ui/Toggle';

const Menu = ({ editor }: { editor: Editor }) => (
  <div className="flex gap-0.5 rounded-md bg-muted-foreground p-0.5">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => editor.chain().focus().undo().run()}
      disabled={!editor.can().chain().focus().undo().run()}
      className="px-2 text-white hover:bg-white"
    >
      <Undo2Icon className="h-4 w-4" />
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => editor.chain().focus().redo().run()}
      disabled={!editor.can().chain().focus().redo().run()}
      className="px-2 text-white hover:bg-white"
    >
      <Redo2Icon className="h-4 w-4" />
    </Button>
    <Toggle
      size="sm"
      pressed={editor.isActive('bold')}
      onPressedChange={() => editor.chain().focus().toggleBold().run()}
      disabled={!editor.can().chain().focus().toggleBold().run()}
      className="text-white hover:bg-white data-[state=on]:bg-white"
    >
      <BoldIcon className="h-4 w-4" />
    </Toggle>
    <Toggle
      size="sm"
      pressed={editor.isActive('italic')}
      onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      disabled={!editor.can().chain().focus().toggleItalic().run()}
      className="text-white hover:bg-white data-[state=on]:bg-white"
    >
      <ItalicIcon className="h-4 w-4" />
    </Toggle>
    <Toggle
      size="sm"
      pressed={editor.isActive('underline')}
      onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      disabled={!editor.can().chain().focus().toggleUnderline().run()}
      className="text-white hover:bg-white data-[state=on]:bg-white"
    >
      <UnderlineIcon className="h-4 w-4" />
    </Toggle>
    <Toggle
      size="sm"
      pressed={editor.isActive('strike')}
      onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      disabled={!editor.can().chain().focus().toggleStrike().run()}
      className="text-white hover:bg-white data-[state=on]:bg-white"
    >
      <StrikethroughIcon className="h-4 w-4" />
    </Toggle>
    <Toggle
      size="sm"
      pressed={editor.isActive('code')}
      onPressedChange={() => editor.chain().focus().toggleCode().run()}
      disabled={!editor.can().chain().focus().toggleCode().run()}
      className="text-white hover:bg-white data-[state=on]:bg-white"
    >
      <Code2Icon className="h-4 w-4" />
    </Toggle>
    <Button
      variant="ghost"
      size="sm"
      onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      className="px-2 text-white hover:bg-white"
    >
      <RemoveFormattingIcon className="h-4 w-4" />
    </Button>
  </div>
);

interface Props {
  placeholder?: string;
  content?: string;
  updateHandler?: (html: string) => void;
  readOnly?: boolean;
}

export default function BubbleMenuEditor({
  placeholder,
  content,
  updateHandler,
  readOnly,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        horizontalRule: false,
        blockquote: false,
        listItem: false,
        dropcursor: false,
        gapcursor: false,
        code: {
          HTMLAttributes: {
            class: 'bg-muted rounded p-1 box-decoration-clone',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'my-0',
          },
        },
      }),
      Underline,
      Placeholder.configure({ placeholder }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class: 'outline-none min-h-7 prose prose-slate max-w-none',
      },
    },
    editable: !readOnly,
    onFocus: ({ editor, event }) => {
      if ('sourceCapabilities' in event && event.sourceCapabilities)
        editor.commands.selectAll();
      setIsFocused(true);
    },
    onBlur: () => setIsFocused(false),
    content,
    onUpdate: ({ editor }) => {
      if (updateHandler) updateHandler(editor.getHTML());
    },
  });

  if (!editor) return <div className="w-full" />;

  return (
    <>
      <BubbleMenu editor={editor}>
        <Menu editor={editor} />
      </BubbleMenu>

      <FloatingMenu editor={editor}>
        <Menu editor={editor} />
      </FloatingMenu>

      <EditorContent
        editor={editor}
        className={`min-h-9 w-full transition-colors ${
          isFocused ? 'border-primary' : 'hover:border-ring'
        } ${readOnly ? '' : 'border-b px-0.5 py-1'}`}
      />
    </>
  );
}
