import { useMutation } from '@tanstack/react-query';
import InputField from '../shared/InputField';
import SubHeading from '../shared/SubHeading';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { z } from 'zod';
import { userProfileSchema } from '@form-builder/validation';
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
import { useRef, useState } from 'react';

type ProfileDetailsFormType = z.infer<typeof userProfileSchema>;

export default function ProfileDetails() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const setCookie = useCookies(['userDetails'])[1];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useForm<ProfileDetailsFormType>({
    resolver: zodResolver(userProfileSchema),
    values: {
      name: auth.name,
      email: auth.email,
    },
  });

  const { mutate, isLoading, variables } = useMutation({
    mutationFn: (data: ProfileDetailsFormType & { avatar?: File | null }) =>
      axiosPrivate.patch('/user/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
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
        <Avatar className="h-20 w-20">
          <AvatarImage src={auth.avatar} />
          <AvatarFallback className="bg-white">
            <UserCircleSvg className="text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-4">
          <Button
            type="button"
            className="cursor-pointer"
            disabled={isLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload New
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            disabled={isLoading}
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0])}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            isLoading={isLoading && variables?.avatar === null}
            onClick={() => {
              mutate(
                {
                  avatar: null,
                },
                {
                  onSuccess: () => toast.success('Avatar updated successfully'),
                  onError: () => toast.error('Failed to update avatar'),
                },
              );
            }}
          >
            Delete Avatar
          </Button>
        </div>
      </article>
      <article className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6">
        <InputField
          label="Full Name"
          placeholder="Enter your full name"
          showRequired
          disabled={isLoading}
          errorMessage={errors.name?.message}
          {...register('name')}
        />
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email address"
          showRequired
          disabled={isLoading}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
      </article>
      <div className="flex justify-end">
        <Button
          disabled={!isDirty || isLoading}
          isLoading={isLoading && variables?.email !== undefined}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
