import useLogout from '../../hooks/useLogout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from '../ui/AlertDialog';

interface Props {
  children: React.ReactNode;
  closeHandler?: () => void;
}

export default function LogoutAlertDialog({ children, closeHandler }: Props) {
  const logout = useLogout();

  return (
    <AlertDialog
      onOpenChange={open => {
        if (!open && closeHandler) closeHandler();
      }}
    >
      <AlertDialogTrigger className="w-full">{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Logging out will end your current session and you will need to enter
            your credentials again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-4">
          <AlertDialogAction onClick={logout}>
            Yes, log me out
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
