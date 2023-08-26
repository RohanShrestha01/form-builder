import { Link } from 'react-router-dom';
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

export default function RecoverPassword() {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Recover Account</CardTitle>
          <CardDescription>Enter your email to recover account</CardDescription>
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
            Request Verification Code
          </Button>
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-muted-foreground">Remembered your password?</p>
            <Link className="text-primary hover:underline" to="/login">
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
