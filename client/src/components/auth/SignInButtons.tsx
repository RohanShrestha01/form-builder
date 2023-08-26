import { Link } from 'react-router-dom';
import {
  FacebookSvg,
  GithubSvg,
  GoogleSvg,
  SSOKeySvg,
} from '../../assets/icons/Svgs';
import { Button } from '../ui/Button';

export default function SignInButtons() {
  return (
    <div className="flex justify-around">
      <Link to="/sso/login" className="space-y-2 text-center">
        <Button
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
          asChild
        >
          <div>
            <SSOKeySvg className="h-[22px] w-[22px]" />
          </div>
        </Button>
        <p className="text-sm text-muted-foreground transition-colors peer-hover:text-foreground">
          SSO
        </p>
      </Link>
      <article className="space-y-2 text-center">
        <Button
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
        >
          <GithubSvg className="h-5 w-5" />
        </Button>
        <p className="text-sm text-muted-foreground peer-hover:text-foreground">
          Github
        </p>
      </article>
      <article className="space-y-2 text-center">
        <Button
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
        >
          <GoogleSvg className="h-5 w-5" />
        </Button>
        <p className="text-sm text-muted-foreground peer-hover:text-foreground">
          Google
        </p>
      </article>
      <article className="space-y-2 text-center">
        <Button
          variant="outline"
          size="icon"
          className="peer h-12 w-12 rounded-2xl"
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
