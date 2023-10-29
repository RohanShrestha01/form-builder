// import { useNavigate } from 'react-router-dom';
import {
  FacebookSvg,
  GithubSvg,
  GoogleSvg,
  // SSOKeySvg,
} from '../../assets/icons/Svgs';
import { Button } from '../ui/Button';

export default function SignInButtons({ disabled }: { disabled?: boolean }) {
  // const navigate = useNavigate();

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
