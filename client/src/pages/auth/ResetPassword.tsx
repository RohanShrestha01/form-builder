import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import InputField from '../../components/shared/InputField';

export default function ResetPassword() {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Reset Account</CardTitle>
          <CardDescription>Enter new password for your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <InputField
            label="New Password"
            name="newPassword"
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
            Reset Password
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
