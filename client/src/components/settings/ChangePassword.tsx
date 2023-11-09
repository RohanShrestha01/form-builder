import { z } from 'zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@form-builder/validation/src/index';

import SubHeading from '../shared/SubHeading';
import InputField from '../shared/InputField';
import PasswordInfoCard from '../auth/PasswordInfoCard';
import { Button } from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useLogout from '../../hooks/useLogout';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';

type ChangePasswordFormType = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePasswordFormType) =>
      axiosPrivate.patch('/user/change-password', data),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormType> = data => {
    mutate(data, {
      onSuccess: () => logout(),
      onError: err => {
        if (isAxiosError(err)) {
          const errors = err.response?.data?.errors;
          if (errors)
            for (const error in errors)
              setError(
                error as 'oldPassword' | 'newPassword' | 'cNewPassword',
                {
                  message: errors[error][0],
                },
              );

          toast.error(err.response?.data?.message || 'Error changing password');
        }
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <SubHeading title="Change Password" />
      <article className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-6">
        <InputField
          label="Old Password"
          placeholder="Enter old password"
          type="password"
          disabled={isPending}
          errorMessage={errors.oldPassword?.message}
          showRequired
          {...register('oldPassword')}
        />
        <div className="relative">
          <InputField
            label="New Password"
            placeholder="Enter new password"
            type="password"
            disabled={isPending}
            errorMessage={errors.newPassword?.message}
            showRequired
            {...register('newPassword')}
          />
          <PasswordInfoCard className="absolute right-0 top-0" />
        </div>
        <div className="relative">
          <InputField
            label="Confirm Password"
            placeholder="Enter new password again"
            type="password"
            disabled={isPending}
            errorMessage={errors.cNewPassword?.message}
            showRequired
            {...register('cNewPassword')}
          />
          <PasswordInfoCard className="absolute right-0 top-0" />
        </div>
      </article>
      <div className="flex justify-end">
        <Button disabled={!isDirty} isLoading={isPending}>
          Change Password
        </Button>
      </div>
    </form>
  );
}
