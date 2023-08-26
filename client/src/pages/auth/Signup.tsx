import { Link } from 'react-router-dom';
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

export default function Signup() {
  return (
    <form>
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
            name="name"
            type="text"
            className="text-slate-600"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            className="text-slate-600"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            className="text-slate-600"
          />
          <InputField
            label="Confirm Password"
            name="cPassword"
            type="password"
            className="text-slate-600"
          />
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
