import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

import {
  FacebookSvg,
  GithubSvg,
  GoogleSvg,
  // SSOKeySvg,
} from '../../assets/icons/Svgs';
import { Button } from '../ui/Button';
import axios from '../../lib/axios';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';

export default function SignInButtons({ disabled }: { disabled?: boolean }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const googleMutation = useMutation({
    mutationFn: (code: string) => axios.post('/auth/google', { code }),
  });

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async ({ code }) => {
      const toastId = toast.loading('Signing you in...');
      googleMutation.mutate(code, {
        onSuccess: () => {
          toast.success('Signed in successfully', { id: toastId });
          navigate(searchParams.get('callbackUrl') ?? '/', { replace: true });
        },
        onError: () => toast.error('Something went wrong!', { id: toastId }),
      });
    },
    onError: () => toast.error('Google login failed!'),
  });

  return (
    <div className="flex justify-around">
      {/* <article className="space-y-2 text-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
          disabled={disabled}
          onClick={() => navigate('/sso/login')}
        >
          <SSOKeySvg className="h-[22px] w-[22px]" />
        </Button>
        <p className="text-sm text-muted-foreground transition-colors peer-hover:text-foreground">
          SSO
        </p>
      </article> */}
      <article className="space-y-2 text-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
          disabled={disabled}
        >
          <GithubSvg className="h-5 w-5" />
        </Button>
        <p className="text-sm text-muted-foreground peer-hover:text-foreground">
          Github
        </p>
      </article>
      <article className="space-y-2 text-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
          disabled={disabled}
          onClick={() => googleLogin()}
        >
          <GoogleSvg className="h-5 w-5" />
        </Button>
        <p className="text-sm text-muted-foreground peer-hover:text-foreground">
          Google
        </p>
      </article>
      <article className="space-y-2 text-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
          disabled={disabled}
        >
          <FacebookSvg className="h-5 w-5" />
        </Button>
        <p className="text-sm text-muted-foreground peer-hover:text-foreground">
          Facebook
        </p>
      </article>
    </div>
  );
}
