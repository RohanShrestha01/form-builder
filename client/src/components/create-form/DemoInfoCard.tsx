import { InfoIcon } from 'lucide-react';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/HoverCard';

export default function DemoInfoCard() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger className="cursor-pointer text-slate-600 hover:text-primary data-[state=open]:text-primary">
        <InfoIcon className="h-5 w-5" />
      </HoverCardTrigger>
      <HoverCardContent className="border-primary bg-primary-background px-4 py-2">
        <h3 className="text-sm font-medium">Sign in with account</h3>
        <ul className="mt-1 list-disc px-4 text-[13px]">
          <li>To save multiple forms in database</li>
          <li>To access and edit your previously created forms</li>
          <li>To generate & share link for filling the created form</li>
          <li>To track responses of the created form</li>
        </ul>
        <HoverCardArrow className="fill-primary" />
      </HoverCardContent>
    </HoverCard>
  );
}
