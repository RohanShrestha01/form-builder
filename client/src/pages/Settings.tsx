import { Trash2Icon } from 'lucide-react';
import ChangePassword from '../components/settings/ChangePassword';
import ProfileDetails from '../components/settings/ProfileDetails';
import { Button } from '../components/ui/Button';
import useTitle from '../hooks/useTitle';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/AlertDialog';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from '../hooks/useLogout';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

  useTitle('Settings | Form Builder');

  const { mutate, isPending } = useMutation({
    mutationFn: () => axiosPrivate.delete('/user/delete-account'),
    onSuccess: () => toast.success('Account deleted successfully'),
    onError: () => toast.error('Error deleting account'),
  });

  return (
    <div className="mt-1">
      <section className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage profile information and change your password
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 text-destructive hover:bg-red-50 hover:text-destructive"
            >
              <Trash2Icon className="h-5 w-5" />
              <span>Delete Account</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you certain you want to delete your account? This action is
                irreversible and will result in the permanent loss of your
                account, including all data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:space-x-4">
              <Button
                variant="destructive"
                isLoading={isPending}
                onClick={() => {
                  mutate();
                  logout();
                }}
              >
                Yes, Delete
              </Button>
              <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
      <section className="mt-6 space-y-8 rounded-lg border p-8 pt-6">
        <ProfileDetails />
        <ChangePassword />
      </section>
    </div>
  );
}
