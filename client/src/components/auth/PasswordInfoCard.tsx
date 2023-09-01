import { InfoIcon } from 'lucide-react';
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/HoverCard';

export default function PasswordInfoCard({
  className = '',
}: {
  className?: string;
}) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger
        className={`cursor-pointer text-slate-600 hover:text-primary data-[state=open]:text-primary ${className}`}
      >
        <InfoIcon className="h-4 w-4" />
      </HoverCardTrigger>
      <HoverCardContent className="border-primary bg-primary-background px-4 py-2">
        <h3 className="text-sm font-medium">Password Must</h3>
        <ul className="mt-1 list-disc px-4 text-[13px]">
          <li>Be at least 8 characters</li>
          <li>Contain a uppercase character</li>
          <li>Contain a lowercase character</li>
          <li>Contain a number</li>
          <li>Contain a special character</li>
        </ul>
        <HoverCardArrow className="fill-primary" />
      </HoverCardContent>
    </HoverCard>
  );
}
