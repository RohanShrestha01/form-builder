import { Link, useNavigate } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@form-builder/validation/src/index';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import InputField from '../../components/shared/InputField';
import { Button } from '../../components/ui/Button';
// import SignInButtons from '../../components/auth/SignInButtons';
import PasswordInfoCard from '../../components/auth/PasswordInfoCard';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useCookies } from 'react-cookie';
import { getEncryptedData } from '../../utils';
import { cookieMaxAge } from '../../utils/constants';
import useTitle from '../../hooks/useTitle';

type SignupFormType = z.infer<typeof registerSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const setCookie = useCookies(['userDetails'])[1];
  const { setAuth } = useAuth();
  useTitle('Sign Up Free | Form Builder');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormType>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignupFormType) =>
      axios.post('/auth/signup', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }),
  });

  const onSubmit: SubmitHandler<SignupFormType> = data => {
    mutation.mutate(data, {
      onSuccess: res => {
        setAuth({
          accessToken: res.data.accessToken,
          ...res.data.data.user,
        });

        setCookie('userDetails', getEncryptedData(res.data.data.user), {
          path: '/',
          maxAge: cookieMaxAge,
        });

        toast.success('Account created successfully');
        navigate('/');
      },
      onError: err => {
        if (isAxiosError(err)) {
          const errors = err.response?.data?.errors;
          if (errors)
            for (const error in errors)
              setError(error as 'name' | 'email' | 'password' | 'cPassword', {
                message: errors[error][0],
              });

          let errorMsg =
            (err.response?.data?.message as string) || 'Registration failed!';
          if (!err.response) errorMsg = 'Network error!';
          toast.error(errorMsg);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email to create account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* <SignInButtons disabled={mutation.isPending} />
          <div className="relative z-10 text-center">
            <hr className="absolute left-0 right-0 top-1/2 -z-10" />
            <p className="inline-block bg-white px-4 text-sm uppercase text-muted-foreground">
              Or Register With Email
            </p>
          </div> */}
          <InputField
            label="Full Name"
            type="text"
            className="text-slate-600"
            errorMessage={errors.name?.message}
            disabled={mutation.isPending}
            {...register('name')}
          />
          <InputField
            label="Email"
            type="email"
            className="text-slate-600"
            errorMessage={errors.email?.message}
            disabled={mutation.isPending}
            {...register('email')}
          />
          <div className="relative">
            <InputField
              label="Password"
              type="password"
              className="text-slate-600"
              errorMessage={errors.password?.message}
              disabled={mutation.isPending}
              {...register('password')}
            />
            <PasswordInfoCard className="absolute -top-[1px] left-[73px]" />
          </div>
          <div className="relative">
            <InputField
              label="Confirm Password"
              type="password"
              className="text-slate-600"
              errorMessage={errors.cPassword?.message}
              disabled={mutation.isPending}
              {...register('cPassword')}
            />
            <PasswordInfoCard className="absolute -top-[1px] left-[130px]" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            isLoading={mutation.isPending}
          >
            Sign Up
          </Button>
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link className="text-primary hover:underline" to="/login">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
