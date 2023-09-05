import { LogOutIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AvatarImage, Avatar, AvatarFallback } from '../ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/DropdownMenu';
import { Link } from 'react-router-dom';
import LogoutAlertDialog from '../shared/LogoutAlertDialog';
import { useState } from 'react';

const UserAvatar = ({ className }: { className?: string }) => {
  const { auth } = useAuth();

  return (
    <Avatar className={className}>
      <AvatarImage src={auth.avatar} />
      <AvatarFallback>
        {auth.name
          ?.match(/\b(\w)/g)
          ?.join('')
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default function UserNav() {
  const { auth } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="outline-none">
        <UserAvatar className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserAvatar />
          <div className="space-y-1 px-2 py-1.5">
            <p className="text-sm font-medium leading-none">{auth.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/settings">
          <DropdownMenuItem className="gap-2 font-medium">
            <SettingsIcon className="h-5 w-5" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <LogoutAlertDialog closeHandler={() => setOpen(false)}>
          <DropdownMenuItem
            className="gap-2 font-medium focus:bg-red-100"
            onSelect={e => e.preventDefault()}
          >
            <LogOutIcon className="h-5 w-5" />
            <span>Log out</span>
          </DropdownMenuItem>
        </LogoutAlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
