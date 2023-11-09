import { useMutation } from '@tanstack/react-query';
import InputField from '../shared/InputField';
import SubHeading from '../shared/SubHeading';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { z } from 'zod';
import { userProfileSchema } from '@form-builder/validation/src/index';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import { cookieMaxAge } from '../../utils/constants';
import { getEncryptedData } from '../../utils';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar';
import { UserCircleSvg } from '../../assets/icons/Svgs';
import AvatarEditorDialog from './AvatarEditorDialog';
import { ImageMinusIcon, ImagePlusIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
} from '../ui/AlertDialog';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type ProfileDetailsFormType = z.infer<typeof userProfileSchema>;

export default function ProfileDetails() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const setCookie = useCookies(['userDetails'])[1];

  const [parent] = useAutoAnimate();

  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm<ProfileDetailsFormType>({
    resolver: zodResolver(userProfileSchema),
    values: {
      name: auth.name,
      email: auth.email,
    },
  });

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (data: ProfileDetailsFormType & { avatar?: File | null }) =>
      axiosPrivate.patch('/user/profile', data),
  });

  const onSubmit: SubmitHandler<ProfileDetailsFormType> = data => {
    mutate(data, {
      onSuccess: res => {
        setAuth(prev => ({
          ...prev,
          ...res.data.data.user,
        }));

        setCookie('userDetails', getEncryptedData(res.data.data.user), {
          path: '/',
          maxAge: cookieMaxAge,
        });

        toast.success('Profile updated successfully');
      },
      onError: err => {
        if (isAxiosError(err)) {
          const errors = err.response?.data?.errors;
          if (errors)
            for (const error in errors)
              setError(error as 'name' | 'email', {
                message: errors[error][0],
              });

          toast.error(err.response?.data?.message || 'Error updating profile');
        }
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <SubHeading title="Profile Details" />
      <article className="flex items-center gap-8">
        {auth.avatar ? (
          <Avatar className="h-20 w-20">
            <AvatarImage src={auth.avatar} />
            <AvatarFallback>
              {auth.name
                ?.match(/\b(\w)/g)
                ?.join('')
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <UserCircleSvg className="h-20 w-20 text-muted-foreground" />
        )}
        <div className="flex gap-4">
          <AvatarEditorDialog>
            <Button
              type="button"
              className="cursor-pointer gap-2"
              disabled={isPending}
            >
              <ImagePlusIcon className="h-5 w-5" />
              <span>Upload New</span>
            </Button>
          </AvatarEditorDialog>
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                className="gap-2"
              >
                <ImageMinusIcon className="h-5 w-5" />
                <span>Delete Avatar</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Avatar?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete your profile picture? This
                  action is irreversible and will permanently remove your
                  current profile picture.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="sm:space-x-4">
                <Button
                  variant="destructive"
                  isLoading={isPending}
                  onClick={() => {
                    mutate(
                      {
                        avatar: null,
                      },
                      {
                        onSuccess: res => {
                          setAuth(prev => ({
                            ...prev,
                            ...res.data.data.user,
                          }));

                          setCookie(
                            'userDetails',
                            getEncryptedData(res.data.data.user),
                            {
                              path: '/',
                              maxAge: cookieMaxAge,
                            },
                          );

                          toast.success('Avatar deleted successfully');
                        },
                        onError: () => toast.error('Failed to delete avatar'),
                        onSettled: () => setDialogOpen(false),
                      },
                    );
                  }}
                >
                  Yes, delete avatar
                </Button>
                <AlertDialogCancel disabled={isPending}>
                  Cancel
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </article>
      <article className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6">
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          showRequired
          disabled={isPending}
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email address"
          showRequired
          disabled={isPending}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
      </article>
      <div className="flex justify-end gap-4" ref={parent}>
        {isDirty && (
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => reset()}
            className="border-destructive text-destructive hover:bg-destructive/5 hover:text-destructive"
          >
            Discard
          </Button>
        )}
        <Button
          disabled={!isDirty || isPending}
          isLoading={isPending && variables?.email !== undefined}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
