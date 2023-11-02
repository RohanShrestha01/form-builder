import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import InputField from '../../components/shared/InputField';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../components/ui/Card';
// import SignInButtons from '../../components/auth/SignInButtons';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import { getEncryptedData } from '../../utils';
import { cookieMaxAge } from '../../utils/constants';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
import useTitle from '../../hooks/useTitle';

interface FormType {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setCookie = useCookies(['userDetails'])[1];
  const { setAuth, persist, setPersist } = useAuth();
  useTitle('Sign In | Form Builder');

  useEffect(() => {
    localStorage.setItem('persist', JSON.stringify(persist));
  }, [persist]);

  const mutation = useMutation({
    mutationFn: (data: FormType) =>
      axios.post('/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }),
  });

  const { register, handleSubmit } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = data => {
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

        toast.success('Logged in successfully');
        navigate(searchParams.get('callbackUrl') ?? '/', { replace: true });
      },
      onError: err => {
        if (isAxiosError(err)) {
          let errorMsg =
            (err.response?.data?.message as string) || 'Login failed!';
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
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* <SignInButtons disabled={mutation.isPending} />
          <div className="relative z-10 text-center">
            <hr className="absolute left-0 right-0 top-1/2 -z-10" />
            <p className="inline-block bg-white px-4 text-sm uppercase text-muted-foreground">
              Or Login With Email
            </p>
          </div> */}
          <InputField
            label="Email"
            type="email"
            placeholder="test@mail.com"
            className="text-slate-600"
            required
            disabled={mutation.isPending}
            {...register('email')}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="Password123@"
            className="text-slate-600"
            required
            disabled={mutation.isPending}
            {...register('password')}
          />
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-3.5 w-3.5 cursor-pointer accent-primary"
                disabled={mutation.isPending}
                checked={persist}
                onChange={() => {
                  setPersist(prev => !prev);
                }}
              />
              <label
                htmlFor="remember-me"
                className="cursor-pointer pl-2 text-sm"
              >
                Stay signed in
              </label>
            </div>
            <Link
              to="/recover-password"
              className="cursor-pointer text-sm underline underline-offset-2 hover:text-primary hover:decoration-primary"
            >
              Forgot password?
            </Link>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button
            type="submit"
            className="w-full"
            isLoading={mutation.isPending}
          >
            Sign In
          </Button>
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-muted-foreground">
              Don&#39;t have an account yet?
            </p>
            <Link className="text-primary hover:underline" to="/signup">
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
