import InputField from '../../components/shared/InputField';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

export default function SSOLogin() {
  useTitle('Sign in with SSO');

  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Single Sign On</CardTitle>
          <CardDescription>Enter your email to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <InputField
            label="Email"
            name="email"
            type="email"
            className="text-slate-600"
          />
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button type="submit" className="w-full">
            Continue
          </Button>
          <Link
            className="flex justify-center text-sm text-primary hover:underline"
            to="/login"
          >
            Sign in without SSO
          </Link>
        </CardFooter>
      </Card>
    </form>
  );
}
