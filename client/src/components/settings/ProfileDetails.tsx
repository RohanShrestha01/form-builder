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

type ProfileDetailsFormType = z.infer<typeof userProfileSchema>;

export default function ProfileDetails() {
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const setCookie = useCookies(['userDetails'])[1];

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

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: ProfileDetailsFormType) =>
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
        <Button disabled={!isDirty} isLoading={isLoading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
