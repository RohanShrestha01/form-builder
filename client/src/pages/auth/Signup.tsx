import { Link } from 'react-router-dom';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@form-builder/validation';
import { z } from 'zod';

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
import SignInButtons from '../../components/auth/SignInButtons';
import PasswordInfoCard from '../../components/auth/PasswordInfoCard';

type SignupFormType = z.infer<typeof registerSchema>;

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<SignupFormType> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email to create account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <SignInButtons />
          <div className="relative z-10 text-center">
            <hr className="absolute left-0 right-0 top-1/2 -z-10" />
            <p className="inline-block bg-white px-4 text-sm uppercase text-muted-foreground">
              Or Register With Email
            </p>
          </div>
          <InputField
            label="Full Name"
            type="text"
            className="text-slate-600"
            errorMessage={errors.name?.message}
            {...register('name')}
          />
          <InputField
            label="Email"
            type="email"
            className="text-slate-600"
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <div className="relative">
            <InputField
              label="Password"
              type="password"
              className="text-slate-600"
              errorMessage={errors.password?.message}
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
              {...register('cPassword')}
            />
            <PasswordInfoCard className="absolute -top-[1px] left-[130px]" />
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button type="submit" className="w-full">
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
