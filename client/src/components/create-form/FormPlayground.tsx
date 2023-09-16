import { EyeIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import Input from '../ui/Input';

export default function FormPlayground() {
  return (
    <form className="flex flex-grow flex-col">
      <section className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <label className="font-medium">Form Name:</label>
          <Input required placeholder="Enter form name" />
        </div>
        <Button
          variant="ghost"
          className="gap-2 text-primary hover:text-primary"
        >
          <EyeIcon className="h-5 w-5" />
          <span>Preview</span>
        </Button>
      </section>
      <section className="flex-grow rounded-lg border-2 border-dashed border-slate-300 bg-muted/25">
        <p className="flex h-full items-center justify-center font-medium text-muted-foreground">
          Drag a element from the right to this area
        </p>
      </section>
      <section className="mt-5 space-x-5 self-end">
        <Button type="reset" variant="destructive">
          Clear Form
        </Button>
        <Button>Save Form</Button>
      </section>
    </form>
  );
}
