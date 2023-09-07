import ChangePassword from '../components/settings/ChangePassword';
import useTitle from '../hooks/useTitle';

export default function Settings() {
  useTitle('Settings | Form Builder');

  return (
    <div className="mt-3">
      <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
      <p className="mt-0.5 text-muted-foreground">
        Manage profile information and change your password
      </p>
      <section className="mt-6 space-y-8 rounded-lg border p-8 pt-6">
        <ChangePassword />
      </section>
    </div>
  );
}
